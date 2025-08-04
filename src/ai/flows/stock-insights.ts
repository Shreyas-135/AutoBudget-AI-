'use server';

/**
 * @fileOverview An AI-powered stock analysis flow that uses a tool to fetch stock prices.
 * 
 * - getStockInsights - A function that provides AI-driven insights for a given stock ticker.
 * - StockInsightsInput - The input type for the getStockInsights function.
 * - StockInsightsOutput - The return type for the getStockInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StockInsightsInputSchema = z.object({
  ticker: z.string().describe('The stock ticker symbol of the company.'),
});
export type StockInsightsInput = z.infer<typeof StockInsightsInputSchema>;

const StockInsightsOutputSchema = z.object({
  analysis: z.string().describe('A brief analysis of the stock and its current price.'),
});
export type StockInsightsOutput = z.infer<typeof StockInsightsOutputSchema>;

const getStockPrice = ai.defineTool(
  {
    name: 'getStockPrice',
    description: 'Returns the current market value of a stock for a given ticker.',
    inputSchema: z.object({
      ticker: z.string().describe('The ticker symbol of the stock.'),
    }),
    outputSchema: z.number(),
  },
  async (input) => {
    // In a real application, you would fetch this from a financial API
    console.log(`Fetching price for ${input.ticker}...`);
    return Math.random() * 1000;
  }
);

const stockInsightPrompt = ai.definePrompt({
    name: 'stockInsightPrompt',
    input: { schema: StockInsightsInputSchema },
    output: { schema: StockInsightsOutputSchema },
    tools: [getStockPrice],
    prompt: `You are a financial analyst. Analyze the stock for the given ticker: {{ticker}}.
    Use the getStockPrice tool to find the current price and include it in your analysis.
    Provide a brief summary of the potential of this stock.`,
});

const stockInsightsFlow = ai.defineFlow(
  {
    name: 'stockInsightsFlow',
    inputSchema: StockInsightsInputSchema,
    outputSchema: StockInsightsOutputSchema,
  },
  async (input) => {
    const {output} = await stockInsightPrompt(input);
    return output!;
  }
);

export async function getStockInsights(input: StockInsightsInput): Promise<StockInsightsOutput> {
  return stockInsightsFlow(input);
}
