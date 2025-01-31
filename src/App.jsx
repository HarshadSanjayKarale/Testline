import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import ResultScreen from './components/ResultScreen';
import { fetchQuizData } from './utils/api';
import './App.css';

function App() {
  const [screen, setScreen] = useState('start');
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function loadQuizData() {
      try {
        const data = await fetchQuizData();
        setQuizData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load quiz data', error);
        setIsLoading(false);
      }
    }
    loadQuizData();
  }, []);

  const handleStart = () => {
    if (quizData.length > 0) {
      setScreen('quiz');
    }
  };

  const handleQuizEnd = (finalScore, finalStreak) => {
    setScore(finalScore);
    setStreak(finalStreak);
    setScreen('result');
  };

  const handleRestart = () => {
    setScreen('start');
    setScore(0);
    setStreak(0);
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="quiz-container loading">
          <Loader2 className="loader-icon spin" size={64} />
          <p>Loading Quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="quiz-container">
        {screen === 'start' && <StartScreen onStart={handleStart} />}
        {screen === 'quiz' && (
          <Quiz 
            quizData={quizData} 
            onEnd={handleQuizEnd} 
          />
        )}
        {screen === 'result' && (
          <ResultScreen 
            score={score} 
            totalQuestions={quizData.length} 
            streak={streak} 
            onRestart={handleRestart} 
          />
        )}
      </div>
    </div>
  );
}

export default App;