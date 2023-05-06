import { Quote, QuoteOfTheDayResponse } from '@/components/model';
import { NextApiRequest, NextApiResponse } from 'next';

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const defaultQuote: Quote = {
    contents: "Don't go through life, grow through life.",
    author: "Anonymous"
}
 
function parseQuote(raw: string): Quote | undefined {
    const regex = /^(.*)\s-\s(.*)$/;
    
    const matches = raw.match(regex);
    
    if (matches) {
      const quote = matches[1];
      const author = matches[2];
    
      return {
        contents: quote,
        author: author
      }
    } else {
      console.log(`Failed to parse: ${raw}`);
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
  
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: qprompt,
    max_tokens: 200,
    temperature: 0.7,
  });

  const qParsed = parseQuote(completion.data.choices[0].text);

  response.status(200).json({
    quote: qParsed ?? defaultQuote
  });
}