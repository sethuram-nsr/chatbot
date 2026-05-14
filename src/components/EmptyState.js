import React from 'react';
import { Zap } from 'lucide-react';
import styles from './EmptyState.module.css';

const SUGGESTIONS = [
  { label: 'Explain async/await', icon: '⚡' },
  { label: 'Write a Python function to sort a list', icon: '🐍' },
  { label: 'What is the difference between TCP and UDP?', icon: '🌐' },
  { label: 'Summarize quantum computing in 3 bullets', icon: '⚛️' },
  { label: 'Write a regex to validate email addresses', icon: '✉️' },
  { label: 'Best practices for React performance', icon: '⚛' },
];

export default function EmptyState({ onSend, apiKeySet }) {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroIcon}>
          <Zap size={28} strokeWidth={1.5} />
          <div className={styles.glow} />
        </div>
        <h2 className={styles.headline}>Ready to assist</h2>
        <p className={styles.sub}>
          {apiKeySet
            ? 'Start a conversation or pick a suggestion below'
            : 'Save your OpenAI API key above to begin'}
        </p>
      </div>

      {apiKeySet && (
        <div className={styles.suggestionsGrid}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              className={styles.chip}
              onClick={() => onSend(s.label)}
            >
              <span className={styles.chipIcon}>{s.icon}</span>
              <span className={styles.chipText}>{s.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <span>Powered by GPT-4o-mini</span>
        <span className={styles.dot}>·</span>
        <span>Conversations stay in memory during this session</span>
      </div>
    </div>
  );
}
