"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface PriceCounterProps {
  targetPrice: number
  duration?: number
  className?: string
}

export default function PriceCounter({ targetPrice, duration = 5000, className = "" }: PriceCounterProps) {
  const [currentPrice, setCurrentPrice] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    setIsAnimating(true)
    setCurrentPrice(0)

    const startTime = Date.now()
    const startPrice = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function mais suave
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
      const easedProgress = easeOutCubic(progress)

      const newPrice = startPrice + (targetPrice - startPrice) * easedProgress
      setCurrentPrice(newPrice)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    // Delay antes de iniciar a animação
    const timeout = setTimeout(() => {
      animate()
    }, 300)

    return () => clearTimeout(timeout)
  }, [targetPrice, duration])

  return (
    <motion.span
      className={className}
      animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.3, repeat: isAnimating ? Number.POSITIVE_INFINITY : 0, repeatDelay: 1 }}
    >
      {Math.round(currentPrice)}
    </motion.span>
  )
}
