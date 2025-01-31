import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Zap, Loader2 } from "lucide-react";
import "./Quiz.css";

export default function Quiz({ quizData, onEnd }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const answers = [...quizData[currentQuestion].answers];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, [currentQuestion, quizData]);

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    const isCorrect = answer === quizData[currentQuestion].answers[0];

    setTimeout(() => {
      if (isCorrect) {
        const newStreak = streak + 1;
        setScore(score + 1);
        setStreak(newStreak);
        setMaxStreak(Math.max(maxStreak, newStreak));
      } else {
        setStreak(0);
      }

      setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          onEnd(score + (isCorrect ? 1 : 0), maxStreak);
        }
      }, 1000);
    }, 500);
  };

  const getButtonClass = (answer) => {
    if (!isAnswered) return "answer-button";
    const isCorrectAnswer = answer === quizData[currentQuestion].answers[0];
    const classes = ["answer-button", "disabled"];
    
    if (isCorrectAnswer) {
      classes.push("correct");
    } else if (selectedAnswer === answer) {
      classes.push("incorrect");
    }
    
    return classes.join(" ");
  };

  return (
    <div className="quiz">
      <div className="progress-container">
        <div className="progress-info">
          <div className="progress-stats">
            <div className="stat">
              Question {currentQuestion + 1}/{quizData.length}
            </div>
            <div className="streak-badge">
              <Zap size={16} />
              Streak: {streak}
            </div>
          </div>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <Loader2 className="loader-icon spin" size={48} />
        </div>
      ) : (
        <TransitionGroup>
          <CSSTransition
            key={currentQuestion}
            timeout={300}
            classNames="fade"
          >
            <div className="question-container">
              <h2 className="question">{quizData[currentQuestion].question}</h2>
              <div className="answers">
                {shuffledAnswers.map((answer, index) => (
                  <button
                    key={index}
                    className={getButtonClass(answer)}
                    onClick={() => handleAnswer(answer)}
                    disabled={isAnswered}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    </div>
  );
}