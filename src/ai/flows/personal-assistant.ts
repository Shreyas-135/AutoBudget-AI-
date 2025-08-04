'use server';

/**
 * @fileOverview A personal financial assistant that can answer questions using tools.
 * 
 * - personalAssistant - A function that chats with a financial assistant.
 * - PersonalAssistantInput - The input type for the personalAssistant function.
 * - PersonalAssistantOutput - The return type for the personalAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getStockPrice } from './stock-insights';
import { getTaxCalculation } from './tax-calculator';
import { getFinancialInsights } from './financial-insights';

const PersonalAssistantInputSchema = z.object({
  history: z.array(z.any()).optional().describe('The chat history.'),
  prompt: z.string().describe('The user\'s question or prompt.'),
});
export type PersonalAssistantInput = z.infer<typeof PersonalAssistantInputSchema>;

const PersonalAssistantOutputSchema = z.object({
    response: z.string().describe('The assistant\'s response.'),
});
export type PersonalAssistantOutput = z.infer<typeof PersonalAssistantOutputSchema>;

const personalAssistantPrompt = ai.definePrompt({
    name: 'personalAssistantPrompt',
    tools: [getStockPrice, getTaxCalculation, getFinancialInsights],
    system: `You are a helpful and friendly personal financial assistant.
    Answer questions about the user's finances.
    If you have the user's income and expenses, you can provide financial insights.
    If you don't know the answer, say that you don't know.`,
});

const personalAssistantFlow = ai.defineFlow(
  {
    name: 'personalAssistantFlow',
    inputSchema: PersonalAssistantInputSchema,
    outputSchema: PersonalAssistantOutputSchema,
  },
  async (input) => {
    const { history, prompt } = input;
    
    let llmResponse = await personalAssistantPrompt({
      history,
      prompt,
    });
    
    while (true) {
        const toolRequest = llmResponse.toolRequest;
        if (!toolRequest) {
            break;
        }

        const toolResponse = await toolRequest.run();

        llmResponse = await personalAssistantPrompt({
            history: [
                ...(history || []),
                { role: 'user', content: [{ text: prompt }] },
                { role: 'model', content: llmResponse.content },
            ],
            prompt: toolResponse,
        });
    }

    return {
        response: llmResponse.text,
    };
  }
);

export async function personalAssistant(input: PersonalAssistantInput): Promise<PersonalAssistantOutput> {
  return personalAssistantFlow(input);
}
