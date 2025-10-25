import React, { useState } from 'react';

function App() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;
        
        setLoading(true);
        try {
            const response = await window.electronAPI.search(query);
            setResult(response);
        } catch (error) {
            setResult('Error fetching results');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Nebula AI Search</h1>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                <input
                    type="text"
                    placeholder="Ask anything..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    style={{
                        flex: 1,
                        padding: '12px',
                        fontSize: '16px',
                        border: '2px solid #ddd',
                        borderRadius: '8px'
                    }}
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        background: '#0066cc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {result && (
                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    whiteSpace: 'pre-wrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    {result}
                </div>
            )}
        </div>
    );
}

export default App;
