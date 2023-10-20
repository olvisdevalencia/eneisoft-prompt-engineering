import OpenAI from 'openai';
import { config } from 'dotenv';
import chalk from 'chalk';
import { prompt } from './shoeStorePrompt.js';

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
});

async function main() {
  console.time(chalk.cyan('Tiempo de ejecución'));

  let interval = setInterval(() => {
    process.stdout.write(chalk.yellow('.')); 
  }, 500);

  const completion = await openai.chat.completions.create({
    messages: [
      ...prompt,
      {
        role: 'user',
        content: 'perfecto muchas gracias'
      }
    ],
    model: 'gpt-3.5-turbo',
  });

  clearInterval(interval);
  console.log('');
  
  console.log(chalk.blue(JSON.stringify(completion.choices[0], null, 2)));
  
  console.timeEnd(chalk.cyan('Tiempo de ejecución'));
}

main();
