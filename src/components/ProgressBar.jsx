import { motion } from "framer-motion"

export default function ProgressBar({ current, total }) {
  const progress = (current / total) * 100

  return (
    <div className="progress-bar">
      <div className="progress-info">
        <span>
          Question {current} of {total}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

