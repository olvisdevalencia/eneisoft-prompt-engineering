import OpenAI from "openai";
import readline from "readline";
import { config } from 'dotenv';
import chalk from 'chalk';
import { prompt } from './shoeStorePrompt.js'; 

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let resetConversation = false; 

async function chatLoop(messages) {
  let interval;

  try {
    console.time(chalk.green("Tiempo de ejecución"));  
    interval = setInterval(() => {
      process.stdout.write(chalk.yellow('.')); 
    }, 500);

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    clearInterval(interval); 
    console.timeEnd(chalk.green("Tiempo de ejecución"));

    const assistantMessage = completion.choices[0].message.content;
    console.log(chalk.red(`\nAsistente: ${assistantMessage}`));

    rl.question(chalk.blue("Tú: "), async (userInput) => {
      if (userInput.toLowerCase() === 'salir') {
        rl.close();
        return;
      }

      if (userInput.toLowerCase() === 'reiniciar') {
        resetConversation = true;
        messages = [...prompt];
      }

      if (!resetConversation) {
        messages.push(
          { role: "user", content: userInput },
          { role: "assistant", content: assistantMessage }
        );
      } else {
        resetConversation = false;
      }

      await chatLoop(messages);
    });
  } catch (error) {
    clearInterval(interval); 
    console.error(chalk.red('Se produjo un error:', error));
  }
}

chatLoop(prompt);
