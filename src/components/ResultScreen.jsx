import { motion } from "framer-motion"

export default function ResultScreen({ score, totalQuestions, streak, onRestart }) {
  const percentage = (score / totalQuestions) * 100

  const getMessage = () => {
    if (percentage === 100) return "Perfect score! You're a genius!"
    if (percentage >= 80) return "Great job! You're really knowledgeable!"
    if (percentage >= 60) return "Good effort! Keep learning and improving!"
    if (percentage >= 40) return "Not bad! There's room for improvement."
    return "Keep practicing! You'll get better with time."
  }

  return (
    <div className="result-screen">
      <motion.h2
        className="result-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Quiz Completed!
      </motion.h2>
      <motion.div
        className="score"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 10 }}
      >
        {score}/{totalQuestions}
      </motion.div>
      <p className="message">{getMessage()}</p>
      <p className="streak">Longest Consecutive Correct Answers: {streak}</p>
      <motion.button
        className="restart-button"
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </motion.button>
    </div>
  )
}