
---

# Prompt Engineering con OpenAI API y Node.js

Este proyecto muestra cómo interactuar con el modelo de lenguaje GPT-3 de OpenAI utilizando Node.js.

## Requisitos previos

- Node.js instalado
- Cuenta de OpenAI y una API key
- `npm` o `yarn` para gestionar paquetes

## Instalación

1. **Clonar el repositorio**

   ```
   git clone https://github.com/olvisdevalencia/eneisoft-prompt-engineering.git
   ```

2. **Entrar en el directorio del proyecto**

   ```
   cd eneisoft-prompt-engineering
   ```

3. **Instalar las dependencias**

   Con npm:

   ```
   npm install
   ```

   O con yarn:

   ```
   yarn
   ```

4. **Configurar las variables de entorno**

   - Copia el archivo `.env-example` y renómbralo a `.env`.
   
     ```
     cp .env-example .env
     ```
   
   - Abre el archivo `.env` con un editor de texto y añade tu API key de OpenAI:
   
     ```
     OPENAI_API_TOKEN=TuAPIKeyAquí
     ```

5. **Ejecutar el script**

   ```
   node openai.js
   ```
   O con los scripts npm:
   
   ```
   npm run hello
   ```
   ```
   npm run basic
   ```
   ```
   npm run interactive
   ```

## Uso

Este proyecto incluye un script de ejemplo `openai.js` que muestra cómo realizar una llamada básica a la API de OpenAI.

## Contribuir

Si tienes alguna mejora o característica que te gustaría añadir, siéntete libre de hacer un pull request.

---