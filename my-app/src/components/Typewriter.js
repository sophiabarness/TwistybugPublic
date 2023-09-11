import React, { useState, useEffect, useMemo } from 'react';
import './typewriter.css';

const Typewriter = ({ delay, infinite }) => {
  const textArray = useMemo(() => [
    'Challenge yourself with puzzles',
    'Keep your brain active',
    'Feel accomplished'
    ], []);
  const [mantraIndex, setMantraIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (currentIndex < textArray[mantraIndex].length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + textArray[mantraIndex][currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else if (infinite) {
        timeout = setTimeout(() => {
            setCurrentIndex(0);
            setCurrentText('');
            setMantraIndex(prevIndex => (prevIndex + 1) % 3);
        }, delay + 1000);
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, mantraIndex, textArray, infinite]);

  return <span className="typewriter-text">{currentText}</span>;
};

export default Typewriter;