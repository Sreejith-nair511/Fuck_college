"use client"

import { motion } from "framer-motion"
import { Train, Zap } from "lucide-react"
import { useState, useEffect } from "react"

interface StartupAnimationProps {
  onComplete: () => void
}

export function StartupAnimation({ onComplete }: StartupAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1000)
    const timer2 = setTimeout(() => setCurrentStep(2), 2500)
    const timer3 = setTimeout(() => setCurrentStep(3), 4000)
    const timer4 = setTimeout(() => onComplete(), 5500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-blue-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center space-y-8">
        {/* Indian Railways Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: currentStep >= 0 ? 1 : 0, scale: currentStep >= 0 ? 1 : 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <Train className="w-12 h-12 text-red-800" />
            </div>
            <motion.div
              className="absolute -inset-2 border-4 border-white/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Train Silhouette Animation */}
        <motion.div
          className="relative h-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep >= 1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 flex items-center text-white/80"
            initial={{ x: "-100%" }}
            animate={{ x: currentStep >= 1 ? "100vw" : "-100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-6 bg-white/90 rounded-sm" />
              <div className="w-6 h-4 bg-white/70 rounded-sm" />
              <div className="w-6 h-4 bg-white/70 rounded-sm" />
              <div className="w-6 h-4 bg-white/70 rounded-sm" />
            </div>
          </motion.div>
        </motion.div>

        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: currentStep >= 2 ? 1 : 0, y: currentStep >= 2 ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white text-balance">AI-Powered Traffic Control</h1>
          <p className="text-xl md:text-2xl text-white/80 font-light">Indian Railways Section Throughput Optimizer</p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center space-x-2"
        >
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-white/80">Initializing System...</span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/60 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
