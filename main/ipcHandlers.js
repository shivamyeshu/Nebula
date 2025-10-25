const { ipcMain } = require('electron');

// Register IPC handler for search
ipcMain.handle('perform-search', async (event, query) => {
    try {
        // For now, return a mock response
        // We'll add real API integration next
        const mockResponse = `
🔍 Search Results for: "${query}"

Here are the key findings:
• Point 1: This is a sample answer
• Point 2: AI integration coming soon
• Point 3: Replace this with actual API call

This is a placeholder. Next step: Add OpenAI/Perplexity API.
        `;
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return mockResponse;
    } catch (error) {
        console.error('Search error:', error);
        return 'Error: Unable to fetch results. Please try again.';
    }
});
