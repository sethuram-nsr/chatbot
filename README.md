# NeuralChat — AI Chatbot (React + OpenAI)
https://neurallchat.netlify.app/

A polished React chatbot powered by OpenAI GPT-4o-mini.

## Features

- 💬 Multi-turn conversation with memory
- 🎨 Dark terminal aesthetic with cyan accents
- ✨ Markdown rendering (code blocks, tables, lists, etc.)
- 📋 Copy any message to clipboard
- 🔢 Token usage display per response
- ⌨️ Typing indicator
- 💡 Suggestion chips on empty state
- 🔑 API key saved securely in session memory

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm start
```
Opens at [http://localhost:3000](http://localhost:3000)

### 3. Add your API key
Paste your OpenAI API key in the bar at the top and click **Save Key**.

> ⚠️ **Security note:** The API key is stored only in React state (memory).
> It is never written to disk or sent anywhere except directly to `api.openai.com`.
> Get your key at: https://platform.openai.com/api-keys

## Project Structure

```
src/
├── hooks/
│   └── useChat.js          # OpenAI API logic & conversation state
├── components/
│   ├── Header.js            # Top navigation bar
│   ├── ApiKeyBar.js         # API key input strip
│   ├── Message.js           # Individual message bubble
│   ├── TypingIndicator.js   # Animated "AI is thinking" indicator
│   ├── EmptyState.js        # Welcome screen with suggestions
│   └── ChatInput.js         # Textarea + send button
├── App.js                   # Root layout
├── App.module.css
├── index.js
└── index.css                # Global styles & markdown overrides
```

## Build for Production

```bash
npm run build
```

Output goes to the `build/` folder — ready to deploy to Vercel, Netlify, etc.

## Environment Variable (Optional)

To avoid entering the key every reload, create a `.env` file:

```
REACT_APP_OPENAI_KEY=sk-proj-your-key-here
```

Then in `App.js`, initialise state with:
```js
const [apiKey, setApiKey] = useState(process.env.REACT_APP_OPENAI_KEY || '');
```

> Never commit `.env` to version control.
