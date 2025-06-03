"use client"

import { useEffect, useRef } from "react"

interface BrainWaveProps {
  className?: string
  intensity?: number
}

export default function BrainWave({ className = "", intensity = 1 }: BrainWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number
    let time = 0

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, "rgba(0, 255, 247, 0.8)")
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.8)")
      gradient.addColorStop(1, "rgba(0, 255, 247, 0.8)")

      ctx.strokeStyle = gradient
      ctx.lineWidth = 2
      ctx.beginPath()

      const amplitude = 30 * intensity
      const frequency = 0.02
      const speed = 0.05

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * frequency + time * speed) * amplitude +
          Math.sin(x * frequency * 2 + time * speed * 1.5) * amplitude * 0.5 +
          Math.sin(x * frequency * 3 + time * speed * 2) * amplitude * 0.25

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
      time++
      animationId = requestAnimationFrame(drawWave)
    }

    drawWave()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [intensity])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 10px rgba(0, 255, 247, 0.5))" }}
      />
    </div>
  )
}
