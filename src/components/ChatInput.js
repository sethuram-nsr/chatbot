import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import styles from './ChatInput.module.css';

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [value]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSend();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scanline} />
      <div className={styles.inner}>
        <div className={styles.inputWrap}>
          <span className={styles.prompt}>&gt;_</span>
          <textarea
            ref={ref}
            className={styles.textarea}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message…  (Enter to send, Shift+Enter for newline)"
            rows={1}
            disabled={disabled}
          />
          <button
            className={styles.sendBtn}
            onClick={onSend}
            disabled={disabled || !value.trim()}
            title="Send message"
          >
            <Send size={16} strokeWidth={1.5} />
          </button>
        </div>
        <div className={styles.hint}>
          <span>Enter <kbd>↵</kbd> to send</span>
          <span className={styles.sep}>·</span>
          <span>Shift+Enter for new line</span>
          {value.length > 0 && (
            <>
              <span className={styles.sep}>·</span>
              <span className={styles.charCount}>{value.length} chars</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
