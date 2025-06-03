"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface NeuralGridProps {
  className?: string
}

export default function NeuralGrid({ className = "" }: NeuralGridProps) {
  const [activeNodes, setActiveNodes] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveNodes = Array.from({ length: Math.random() * 5 + 3 }, () => Math.floor(Math.random() * 64))
      setActiveNodes(newActiveNodes)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-8 gap-2 p-6">
        {Array.from({ length: 64 }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full border transition-all duration-1000 ${
              activeNodes.includes(index)
                ? "bg-cyan-400 border-cyan-400 shadow-[0_0_10px_#00fff7]"
                : "bg-transparent border-cyan-800/30"
            }`}
            animate={{
              scale: activeNodes.includes(index) ? [1, 1.5, 1] : 1,
              opacity: activeNodes.includes(index) ? [0.5, 1, 0.5] : 0.3,
            }}
            transition={{ duration: 2, repeat: activeNodes.includes(index) ? Number.POSITIVE_INFINITY : 0 }}
          />
        ))}
      </div>

      {/* Neural connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {activeNodes.map((node, index) => {
          if (index === activeNodes.length - 1) return null
          const nextNode = activeNodes[index + 1]
          const x1 = (node % 8) * 32 + 40
          const y1 = Math.floor(node / 8) * 32 + 40
          const x2 = (nextNode % 8) * 32 + 40
          const y2 = Math.floor(nextNode / 8) * 32 + 40

          return (
            <motion.line
              key={`${node}-${nextNode}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#neuralGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          )
        })}
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00fff7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
