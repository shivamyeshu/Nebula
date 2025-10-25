const { ipcMain } = require('electron');
const fetch = require('node-fetch');

ipcMain.handle('perform-search', async (event, query) => {
  // Replace below with actual API call to Perplexity / OpenAI or other AI search API
  try {
    const apiKey = process.env.AI_API_KEY;
    const apiUrl = `https://api.openai.com/v1/chat/completions`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Answer this concisely: ${query}` }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "No answer found";
    return answer;

  } catch (error) {
    return `Error: ${error.message}`;
  }
});
