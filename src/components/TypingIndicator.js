import React from 'react';
import styles from './TypingIndicator.module.css';

export default function TypingIndicator() {
  return (
    <div className={styles.row}>
      <div className={styles.avatar}>AI</div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.name}>Assistant</span>
          <span className={styles.status}>thinking...</span>
        </div>
        <div className={styles.dots}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
