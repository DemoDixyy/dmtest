"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function CyberCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState("default")
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [particles, setParticles] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let trailId = 0
    let particleId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)

      // Adicionar trail
      setTrails((prev) => {
        const newTrail = { x: newPosition.x, y: newPosition.y, id: trailId++ }
        const updatedTrails = [newTrail, ...prev].slice(0, 8) // Manter apenas 8 trails
        return updatedTrails
      })

      // Detectar tipo de elemento
      const target = e.target as HTMLElement
      if (target) {
        if (target.tagName === "BUTTON" || target.tagName === "A" || target.classList.contains("clickable")) {
          setCursorState("hover")
        } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          setCursorState("text")
        } else if (target.classList.contains("neural")) {
          setCursorState("neural")
        } else if (target.classList.contains("loading")) {
          setCursorState("loading")
        } else {
          setCursorState("default")
        }
      }
    }

    const handleMouseDown = () => {
      setCursorState("click")

      // Criar partículas no clique
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        x: mousePosition.x,
        y: mousePosition.y,
        id: particleId++,
      }))

      setParticles((prev) => [...prev, ...newParticles])

      // Remover partículas após animação
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
      }, 1000)
    }

    const handleMouseUp = () => {
      setCursorState("default")
    }

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Cleanup trails periodicamente
    const trailCleanup = setInterval(() => {
      setTrails((prev) => prev.slice(0, 5))
    }, 100)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      clearInterval(trailCleanup)
    }
  }, [mousePosition])

  return (
    <>
      {/* Cursor principal */}
      <div
        className={`cyber-cursor ${cursorState}`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />

      {/* Ponto central */}
      <div
        className="cyber-cursor-dot"
        style={{
          left: mousePosition.x - 2,
          top: mousePosition.y - 2,
        }}
      />

      {/* Trails (rastros) */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cyber-cursor-trail"
          style={{
            left: trail.x - 1,
            top: trail.y - 1,
            opacity: ((trails.length - index) / trails.length) * 0.6,
            transform: `scale(${(trails.length - index) / trails.length})`,
          }}
        />
      ))}

      {/* Partículas de clique */}
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={
            {
              left: particle.x - 1.5,
              top: particle.y - 1.5,
              "--random-x": `${(Math.random() - 0.5) * 100}px`,
              "--random-y": `${(Math.random() - 0.5) * 100}px`,
              animationDelay: `${index * 0.1}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  )
}
