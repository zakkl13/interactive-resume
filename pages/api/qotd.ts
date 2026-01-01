import { Quote, QuoteOfTheDayResponse } from '@/components/model';
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const defaultQuote: Quote = {
    contents: "Don't go through life, grow through life.",
    author: "Anonymous"
}
 
function parseQuote(raw: string): Quote | undefined {
    const regex = /^(.*)\s-\s(.*)$/;
    
    const matches = raw.match(regex);
    
    if (matches) {
      const quote = matches[1].replace(/^"|"$/g, ''); // Remove surrounding quotes if present
      const author = matches[2];
    
      return {
        contents: quote,
        author: author
      }
    } else {
      console.log(`Failed to parse: ${raw}`);
      // Fallback: try to split by " - " if regex fails
      const parts = raw.split(" - ");
      if (parts.length >= 2) {
          return {
              contents: parts[0].replace(/^"|"$/g, ''),
              author: parts[parts.length - 1]
          }
      }
      return undefined;
    }   
}

export function qotdPrompt(themes: string[]): string {
    return `You are a Quote of the Day generator. Your purpose is to provide quotes (these can be made up or real quotes) that are ${themes.join(", ")}.
     When responding you must only respond with the quote in the following format:
     "<quote>" - <author of quote>

     Here is an example
     "Don't go through life, grow through life" - Anonymous

     and here is another example
     “Age is of no importance unless youre a cheese.” - Alberto Einstein

     Please generate a new quote.
    `;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<QuoteOfTheDayResponse>,
) {
  const qprompt: string = qotdPrompt(["inspirational", "motivational", "funny"]);
  
  try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: qprompt }],
        max_tokens: 200,
        temperature: 0.7,
      });

      const content = completion.choices[0].message.content;
      const qParsed = content ? parseQuote(content) : undefined;

      response.status(200).json({
        quote: qParsed ?? defaultQuote
      });
  } catch (error) {
      console.error("OpenAI API Error:", error);
      response.status(200).json({
          quote: defaultQuote
      });
  }
}
