import React, { useState } from 'react';
import { Key, Check, Eye, EyeOff } from 'lucide-react';
import styles from './ApiKeyBar.module.css';

export default function ApiKeyBar({ onSave, saved, apiStatus }) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);

  const handleSave = () => {
    if (value.trim()) onSave(value.trim());
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSave();
  };

  return (
    <div className={styles.bar}>
      <Key size={13} strokeWidth={1.5} className={styles.icon} />
      <div className={styles.labelGroup}>
        <span className={styles.label}>Mistral API Key</span>
        {apiStatus === 'checking' && <span className={styles.statusChecking}>• Checking...</span>}
        {apiStatus === 'valid' && <span className={styles.statusValid}>• Active</span>}
        {apiStatus === 'invalid' && <span className={styles.statusInvalid}>• Invalid Key</span>}
        {apiStatus === 'quota_exceeded' && <span className={styles.statusInvalid}>• Quota Exceeded</span>}
      </div>
      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          type={show ? 'text' : 'password'}
          placeholder={saved ? '●●●●●●●●●●●●●●●●●●●● (saved)' : 'sk-proj-...  paste your key here'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          disabled={saved}
          autoComplete="off"
        />
        {!saved && (
          <button className={styles.toggle} onClick={() => setShow((s) => !s)} tabIndex={-1}>
            {show ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        )}
      </div>
      <button
        className={`${styles.saveBtn} ${saved ? styles.saved : ''}`}
        onClick={handleSave}
        disabled={saved || !value.trim()}
      >
        {saved ? (
          <>
            <Check size={12} strokeWidth={2.5} /> Saved
          </>
        ) : (
          'Save Key'
        )}
      </button>
    </div>
  );
}
