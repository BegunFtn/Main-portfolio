'use client'

import { motion } from 'framer-motion'

export default function Template({ children }) {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}