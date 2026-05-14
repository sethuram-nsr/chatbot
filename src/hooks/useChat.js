import { useState, useCallback } from 'react';

export function useChat(apiKey) {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || loading) return;
    setError(null);

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const newHistory = [...history, { role: 'user', content: text.trim() }];
    setHistory(newHistory);
    setLoading(true);

    try {
      const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'open-mistral-7b',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful, knowledgeable AI assistant. Give clear, well-structured answers. Use markdown formatting when it improves clarity (code blocks, lists, etc.).',
            },
            ...newHistory,
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.error?.message || `API error: ${res.status}`);
      }

      const reply = data.choices[0].message.content;
      const usage = data.usage;

      setHistory((h) => [...h, { role: 'assistant', content: reply }]);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          tokens: usage?.total_tokens,
        },
      ]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'error',
          content: err.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [apiKey, history, loading]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setHistory([]);
    setError(null);
  }, []);

  return { messages, loading, error, sendMessage, clearChat };
}
