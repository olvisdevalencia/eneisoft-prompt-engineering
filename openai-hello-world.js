import OpenAI from 'openai';
import { config } from 'dotenv';
import chalk from 'chalk';

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
      { 
        role: 'system', 
        content: 'Eres una persona experta en recetas de cocinas peruanas, indicarás una lista de ingredientes que se necesitarán, e indicarás paso a paso cómo realizarlo' 
      },
      { 
        role: 'user', 
        content: 'quiero preparar papas a la huancaina' 
      }
    ],
    model: 'gpt-3.5-turbo'
  });

  clearInterval(interval);
  console.log('');
  
  console.log(chalk.blue(JSON.stringify(completion.choices[0], null, 2)));
  
  console.timeEnd(chalk.cyan('Tiempo de ejecución'));
}

main();
