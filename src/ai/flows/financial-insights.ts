'use server';

/**
 * @fileOverview AI-powered financial insights and personalized advice flow.
 *
 * - getFinancialInsights - A function that provides AI-driven insights based on user's financial data.
 * - FinancialInsightsInput - The input type for the getFinancialInsights function.
 * - FinancialInsightsOutput - The return type for the getFinancialInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialInsightsInputSchema = z.object({
  income: z.number().describe('Total monthly income.'),
  expenses: z.array(
    z.object({
      category: z.string().describe('Category of the expense.'),
      amount: z.number().describe('Amount spent in the category.'),
    })
  ).describe('List of expenses with categories and amounts.'),
  savingsGoal: z.number().optional().describe('Optional savings goal.'),
});
export type FinancialInsightsInput = z.infer<typeof FinancialInsightsInputSchema>;

const FinancialInsightsOutputSchema = z.object({
  summary: z.string().describe('A summary of the user financial situation.'),
  advice: z.array(z.string()).describe('Personalized advice based on spending habits.'),
});
export type FinancialInsightsOutput = z.infer<typeof FinancialInsightsOutputSchema>;

export async function getFinancialInsights(input: FinancialInsightsInput): Promise<FinancialInsightsOutput> {
  return financialInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialInsightsPrompt',
  input: {schema: FinancialInsightsInputSchema},
  output: {schema: FinancialInsightsOutputSchema},
  prompt: `You are a personal finance advisor providing insights and advice based on user's financial data.

  Provide a summary of the user's financial situation, including income, expenses, and potential savings.
  Based on the provided data, give personalized advice to help the user optimize their budget and meet their financial goals.

  Income: {{income}}
  Expenses:
  {{#each expenses}}
  - {{category}}: {{amount}}
  {{/each}}
  Savings Goal: {{savingsGoal}}
  Output the advice as a numbered list.
  Summary:
  Advice:`, 
});

const financialInsightsFlow = ai.defineFlow(
  {
    name: 'financialInsightsFlow',
    inputSchema: FinancialInsightsInputSchema,
    outputSchema: FinancialInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
