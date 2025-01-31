import { motion } from "framer-motion"

export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to the Quiz!
      </motion.h1>
      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Test your knowledge and have fun!
      </motion.p>
      <motion.button className="start-button" onClick={onStart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Start Quiz
      </motion.button>
    </div>
  )
}

