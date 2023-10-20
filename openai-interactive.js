import OpenAI from "openai";
import readline from "readline";
import { config } from 'dotenv';
import { prompt } from './shoeStorePrompt.js'; // Asegúrate de tener este archivo y que exporte el prompt

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let resetConversation = false; // Variable para controlar el reinicio de la conversación

async function chatLoop(messages) {
  let interval;

  try {
    interval = setInterval(() => {
      process.stdout.write('.'); // Imprime un punto cada 500 ms
    }, 500);

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    clearInterval(interval); // Detiene el intervalo cuando se obtiene la respuesta

    const assistantMessage = completion.choices[0].message.content;
    console.log(`\nAsistente: ${assistantMessage}`);

    rl.question("Tú: ", async (userInput) => {
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
    clearInterval(interval); // Asegura que el intervalo se detenga en caso de error
    console.error('Se produjo un error:', error);
  }
}

// Inicia el chat
chatLoop(prompt);
