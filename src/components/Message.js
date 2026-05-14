import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, AlertTriangle } from 'lucide-react';
import styles from './Message.module.css';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button className={styles.copyBtn} onClick={handleCopy} title="Copy message">
      {copied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} strokeWidth={1.5} />}
    </button>
  );
}

export default function Message({ message }) {
  const { role, content, time, tokens } = message;
  const isUser = role === 'user';
  const isError = role === 'error';
  const isAI = role === 'assistant';

  return (
    <div className={`${styles.row} ${styles[role]}`}>
      <div className={styles.avatar}>
        {isUser ? 'U' : isError ? '!' : 'AI'}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.name}>
            {isUser ? 'You' : isError ? 'Error' : 'Assistant'}
          </span>
          <span className={styles.time}>{time}</span>
          {tokens && (
            <span className={styles.tokens}>{tokens} tokens</span>
          )}
        </div>

        <div className={`${styles.bubble} ${isError ? styles.errorBubble : ''}`}>
          {isError ? (
            <div className={styles.errorContent}>
              <AlertTriangle size={14} strokeWidth={1.5} />
              <span>{content}</span>
            </div>
          ) : isUser ? (
            <p className={styles.userText}>{content}</p>
          ) : (
            <div className="md-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {!isError && <CopyButton text={content} />}
    </div>
  );
}
