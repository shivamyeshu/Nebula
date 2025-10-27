require('dotenv').config();
const { ipcMain } = require('electron');
const { GoogleGenAI } = require('@google/genai');

// Initialize client
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

// Register IPC handler
ipcMain.handle('perform-search', async (event, query) => {
    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001', // or 'gemini-2.0-pro'
            contents: [
                `You are a concise, helpful AI. Provide an accurate answer in structured bullets or a paragraph. Do not include links.
                Question: ${query}`
            ]
        });

        // `result.text` is the actual answer string
        return result.text;
    } catch (error) {
        console.error('Gemini API Error:', error);
        return ` Error: ${error.message}\n\nCheck your API key, quotas, or try again later.`;
    }
});
