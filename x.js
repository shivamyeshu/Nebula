
const { GoogleGenAI } = require('@google/genai');

async function testGeminiSearch() {
  const apiKey = 'AI'; 

  const client = new GoogleGenAI({
    apiKey: apiKey,
    vertexai: false,
  });

  let messageBuffer = '';

  // Google Search tool enable karte hue live session connect karo
  const session = await client.live.connect({
    model: 'gemini-live-2.5-flash-preview',
    config: {
      tools: [{ googleSearch: {} }],
      responseModalities: ['TEXT'],
      systemInstruction: {
        parts: [{ text: "You are a helpful assistant. Only respond based on verified content directly from the website or trusted sources. Avoid speculation." }],
      },
    },
    callbacks: {
      onopen: () => {
        console.log('Session connected');
      },
      onmessage: (message) => {
        const parts = message.serverContent?.modelTurn?.parts;
        if (parts) {
          for (const part of parts) {
            if (part.text) {
              messageBuffer += part.text;
            }
          }
        }

        if (message.serverContent?.generationComplete) {
          console.log('AI Response:', messageBuffer.trim());
          messageBuffer = ''; // Clear buffer for next message
        }
      },
      onerror: (error) => {
        console.error('Error:', error.message);
      },
      onclose: () => {
        console.log('Session closed');
      },
    },
  });

  // User query bhejo
  const userQuery = "Which companies currently hire freshers for remote software development jobs in India ?";
  console.log('Sending user query:', userQuery);
  await sendWithRetry(session, userQuery);

  //  (5 sec)
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Session close
  await session.close();
}

async function sendWithRetry(session, inputText, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await session.sendRealtimeInput({ text: inputText });
      return; // success
    } catch (err) {
      console.warn(`Attempt ${i + 1} failed:`, err.message);
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 2000)); // wait before retry
    }
  }
}


testGeminiSearch().catch(console.error);