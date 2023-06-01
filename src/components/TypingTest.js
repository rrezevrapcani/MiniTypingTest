import React, { useState, useEffect } from 'react';
import '../styles/TypingTest.css'
import Confetti from "../images/confetti.png"

const words = [
  'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
  'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
  'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna',
  'aliqua', 'Ut', 'enim', 'ad', 'minim','op', 'veniam', 'quis','las',
  'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat'
];

export default function TypingTest (){
  const [text, setText] = useState('');
  const [time, setTime] = useState(30);
  const [started, setStarted] = useState(false);
  const [accuracy, setAccuracy] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    let timer;
    if (started && time > 0) {
      timer = setTimeout(() => setTime(time - 1), 1000);
    } else if (time === 0) {
      setAccuracy(calculateAccuracy());
    }
    return () => clearTimeout(timer);
  }, [started, time]);

  const calculateAccuracy = () => {
    const typedWords = text.trim().split(' ');
    let correctWords = 0;
    let incorrectWords = 0;

    typedWords.forEach((word, index) => {
      if (word === words[index]) {
        correctWords++;
      } else {
        incorrectWords++;
      }
    });

    return {
      correct: correctWords,
      incorrect: incorrectWords
    };
  };

  const handleChange = event => {
    setText(event.target.value);
  };

  const startTest = () => {
    setStarted(true);
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const restartTest = () =>{
    setStarted(false);
    setText('');
    setTime(30);
    setAccuracy({ correct: 0, incorrect: 0});
  };

  return (
    <div className="container">
      <h1 className="main-title">Type The Words:</h1>
      
      <div className="main-words">{words.join(' ')}</div>
      {time==0? <p className="main-timer">-Time Out-</p>:<p className="main-timer"> {formatTime(time)}</p>}
      <textarea
        rows={4}
        cols={50}
        value={text}
        onChange={handleChange}
        disabled={!started || time === 0}
        className="main-textarea"
      />

      <div className="main-buttons">
        <button onClick={startTest} disabled={started} className={started ? "start-button-disabled":"start-button"}>
        Start
      </button>
      <button onClick={restartTest} disabled={!started} className={started ? "start-button":"start-button-disabled"}>
        Restart
      </button>
      </div>

      {time === 0 && (
        <div className="main-results">
          <p>Accuracy: {(100*accuracy.correct/words.length).toFixed(2)}%</p>
          <p>Correct: {accuracy.correct}</p>
          <p>Incorrect: {accuracy.incorrect}</p>
        </div>
      )}
      
      {(100*accuracy.correct/words.length)==100 && (
        <div className="main-cong" >
            <img src={Confetti} className="confetti"/>Well Done!!<img src={Confetti} className="confetti"/>
        </div>
      )}
    </div>
  );
};


