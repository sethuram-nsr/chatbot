import React from 'react';
import { Cpu, Trash2 } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ messageCount, onClear }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Cpu size={18} strokeWidth={1.5} />
          <div className={styles.logoPulse} />
        </div>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>NeuralChat</h1>
          <span className={styles.subtitle}>GPT-4o-mini</span>
        </div>
      </div>

      <div className={styles.center}>
        <span className={styles.statusDot} />
        <span className={styles.statusText}>Online</span>
      </div>

      <div className={styles.right}>
        {messageCount > 0 && (
          <span className={styles.msgCount}>{messageCount} msg{messageCount !== 1 ? 's' : ''}</span>
        )}
        {messageCount > 0 && (
          <button className={styles.clearBtn} onClick={onClear} title="Clear conversation">
            <Trash2 size={14} strokeWidth={1.5} />
            Clear
          </button>
        )}
      </div>
    </header>
  );
}
