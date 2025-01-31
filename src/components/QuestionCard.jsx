import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function QuestionCard({ question, answers, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const correctAnswer = answers[0] // Assuming the first answer is always correct

  useEffect(() => {
    // Reset selected answer when question changes
    setSelectedAnswer(null)
  }, [])

  const handleAnswer = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index)
      setTimeout(() => {
        onAnswer(index === 0)
      }, 1000)
    }
  }

  return (
    <motion.div
      className="question-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="question">{question}</h2>
      <div className="answers">
        {answers.map((answer, index) => (
          <motion.button
            key={index}
            className={`answer-button ${
              selectedAnswer === null
                ? ""
                : selectedAnswer === index
                  ? index === 0
                    ? "correct"
                    : "incorrect"
                  : "disabled"
            }`}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
            whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
          >
            {answer}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

