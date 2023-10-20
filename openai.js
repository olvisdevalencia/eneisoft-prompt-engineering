import OpenAI from 'openai';
import { config } from 'dotenv';
import { prompt } from './shoeStorePrompt.js';

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
});

async function main() {

  const completion = await openai.chat.completions.create({
    messages: [
      ...prompt, 
      ...[    
      {
      role: 'user',
      content: 'perfecto muchas gracias'
    }
  ]],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);
}

main();