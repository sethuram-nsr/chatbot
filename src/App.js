import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ApiKeyBar from './components/ApiKeyBar';
import Message from './components/Message';
import TypingIndicator from './components/TypingIndicator';
import EmptyState from './components/EmptyState';
import ChatInput from './components/ChatInput';
import { useChat } from './hooks/useChat';
import styles from './App.module.css';

export default function App() {
  const [apiKey, setApiKey] = useState((process.env.REACT_APP_MISTRAL || '').trim());
  const [keySaved, setKeySaved] = useState(!!process.env.REACT_APP_MISTRAL);
  const [apiStatus, setApiStatus] = useState(null);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const { messages, loading, sendMessage, clearChat } = useChat(apiKey);

  const checkApiStatus = async (key) => {
    if (!key) return;
    setApiStatus('checking');
    try {
      // Pinging Mistral models endpoint to check key validity
      const response = await fetch('https://api.mistral.ai/v1/models', {
        headers: { Authorization: `Bearer ${key}` }
      });
      
      if (response.ok) {
        setApiStatus('valid');
      } else {
        const data = await response.json();
        // Mistral might have different error structures, but 401/429 are standard
        if (response.status === 429) {
          setApiStatus('quota_exceeded');
        } else {
          setApiStatus('invalid');
        }
      }
    } catch (err) {
      setApiStatus('invalid');
    }
  };

  useEffect(() => {
    if (apiKey) checkApiStatus(apiKey);
  }, [apiKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSaveKey = (key) => {
    setApiKey(key);
    setKeySaved(true);
  };

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput('');
    sendMessage(msg);
  };

  return (
    <div className={styles.app}>
      {/* Ambient background glows */}
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <Header messageCount={messages.length} onClear={clearChat} />


      <main className={styles.main}>
        <div className={styles.messagesContainer}>
          {messages.length === 0 && !loading ? (
            <EmptyState onSend={handleSend} apiKeySet={keySaved} />
          ) : (
            <div className={styles.messageList}>
              {messages.map((msg) => (
                <Message key={msg.id} message={msg} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </main>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={() => handleSend()}
        disabled={loading || !keySaved}
      />
    </div>
  );
}
