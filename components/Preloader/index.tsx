'use client';
import styles from './style.module.scss';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { slideUp } from './anim';

const terminalMessages = [
  { text: 'Welcome to the KeyGEnCoders Mainframe', delay: 300 },
  { text: 'Initializing hardware... [OK]', delay: 400 },
  { text: 'Loading system files... [OK]', delay: 500 },
  { text: 'Booting kernel v3.2.1... [OK]', delay: 400 },
  { text: 'Starting network services... [OK]', delay: 600 },
  { text: 'Decrypting main content... [DONE]', delay: 500 },
  { text: 'System ready.', delay: 300 },
];

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const historyRef = useRef<HTMLUListElement>(null);

  // Type out messages character by character
  useEffect(() => {
    if (done) return;

    if (msgIndex >= terminalMessages.length) {
      setDone(true);
      onComplete?.();
      return;
    }

    const msg = terminalMessages[msgIndex];

    if (charIndex < msg.text.length) {
      // Type next character
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + msg.text[charIndex]);
        setCharIndex(charIndex + 1);
      }, 30 + Math.random() * 20);
      return () => clearTimeout(timer);
    } else {
      // Finished this line — push to history, move to next
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, msg.text]);
        setCurrentLine('');
        setCharIndex(0);
        setMsgIndex(msgIndex + 1);
      }, msg.delay);
      return () => clearTimeout(timer);
    }
  }, [msgIndex, charIndex, done]);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
      <div className={styles.terminal}>
        <ul ref={historyRef} className={styles.terminalHistory}>
          {lines.map((line, i) => (
            <li key={i}>
              <span className={styles.prompt}>&gt; </span>
              {line}
            </li>
          ))}
        </ul>

        {!done && (
          <div className={styles.terminalInput}>
            <span className={styles.prompt}>&gt; </span>
            <span>{currentLine}</span>
            <span className={styles.caret} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Preloader;