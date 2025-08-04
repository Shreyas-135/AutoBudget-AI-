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
  summary: z.string().describe('A summary of the user\'s financial situation, focusing on the ratio of needs vs. wants.'),
  advice: z.array(z.string()).describe('Personalized advice and behavioral coaching based on spending habits and financial psychology.'),
});
export type FinancialInsightsOutput = z.infer<typeof FinancialInsightsOutputSchema>;

export async function getFinancialInsights(input: FinancialInsightsInput): Promise<FinancialInsightsOutput> {
  return financialInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialInsightsPrompt',
  input: {schema: FinancialInsightsInputSchema},
  output: {schema: FinancialInsightsOutputSchema},
  prompt: `You are a financial psychologist and coach. Your goal is to analyze a user's spending patterns and provide actionable, empathetic advice based on behavioral finance principles.

  Analyze the user's income, expenses, and savings goal. Provide a summary that highlights key financial ratios (e.g., savings rate, debt-to-income if applicable, spending on wants vs. needs).
  
  Then, offer personalized advice and coaching. Look for behavioral patterns in their spending. For example:
  - Is there high spending in categories like "Food" or "Shopping" that might indicate emotional or impulse spending?
  - Is there a lack of savings that might point to a present bias?
  - Are their goals realistic given their spending habits?

  Frame your advice as a supportive coach. Instead of just saying "spend less on X," offer strategies like "It looks like a significant portion of your budget goes to dining out. This can sometimes be a sign of stress or a need for convenience. Have you considered trying meal prepping as a way to both save money and have healthy food ready on busy days?"
  
  User Data:
  - Monthly Income: {{income}}
  - Monthly Savings Goal: {{#if savingsGoal}}{{savingsGoal}}{{else}}Not set{{/if}}
  - Expenses:
  {{#each expenses}}
  - {{category}}: {{amount}}
  {{/each}}
  
  Generate a concise summary and a list of actionable, behavioral-focused advice.`,
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
