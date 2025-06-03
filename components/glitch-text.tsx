"use client"

import { useEffect, useState } from "react"

interface GlitchTextProps {
  children: string
  className?: string
  intensity?: "low" | "medium" | "high"
}

export default function GlitchText({ children, className = "", intensity = "low" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        // 5% chance de glitch
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <span className={`glitch-text ${isGlitching ? "animate-pulse" : ""} ${className}`} data-text={children}>
      {children}
    </span>
  )
}
