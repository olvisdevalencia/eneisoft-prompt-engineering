import OpenAI from 'openai';
import { config } from 'dotenv';

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
});

async function main() {

  const completion = await openai.chat.completions.create({
    messages: [
      { 
        role: 'system', 
        content: 'Eres una persona experta en recetas de cocinas peruanas, indicaras una lista de ingredientes que se necesitaran, e indicaras paso a paso como realizarlo' 
      },
      { 
        role: 'user', 
        content: 'quiero preparar papas a la huancaina' 
      }
      ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);
}

main();