"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import BrainWave from "@/components/brain-wave"
import SoundButton from "@/components/sound-button"

export default function HomePage() {
  const [isEntering, setIsEntering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState("Neural")
  const [neuralActivity, setNeuralActivity] = useState(1)
  const router = useRouter()

  useEffect(() => {
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        const activity = Math.min(2, Math.abs(e.movementX + e.movementY) / 50 + 0.5)
        setNeuralActivity(activity)
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const handleEnter = useCallback(() => {
    setIsEntering(true)
    setTimeout(() => {
      router.push("/home")
    }, 1500)
  }, [router])

  const handleTabClick = useCallback(
    (tab: string) => {
      setActiveTab(tab)
      if (tab === "Commerce") {
        router.push("/home")
      } else if (tab === "Interface") {
        router.push("/info")
      }
    },
    [router],
  )

  if (isEntering) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Neural network background - simplificado */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-black to-purple-900/10" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center"
        >
          {/* Neural core - simplificado */}
          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-12 relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(0, 255, 247, 0.3), transparent, rgba(139, 92, 246, 0.3), transparent)",
                filter: "blur(3px)",
              }}
            />

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-16 md:inset-20 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <div
              className="text-2xl md:text-4xl font-bold tracking-[0.4em] text-cyan-400"
              style={{
                fontFamily: "var(--font-orbitron)",
                textShadow: "0 0 20px #00fff7, 0 0 40px #00fff7",
              }}
            >
              NEURAL LINK
            </div>
            <div className="text-sm md:text-lg tracking-[0.6em] text-cyan-400/80">ESTABLISHING CONNECTION</div>

            {/* Progress bar */}
            <div className="w-64 md:w-80 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Neural background pattern - simplificado */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      </div>

      {/* Interactive neural field - otimizado */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-700"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 247, 0.1), transparent 40%)`,
        }}
      />

      {/* Neural activity indicators */}
      <div className="absolute top-0 left-0 w-full h-2 bg-black/50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
          animate={{ width: `${neuralActivity * 50}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Top Neural Interface - responsivo */}
      <nav className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-4 md:gap-8 px-4 md:px-8 py-3 md:py-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-cyan-500/30">
          {["Neural", "Sync", "Commerce", "Interface"].map((item) => (
            <SoundButton
              key={item}
              onClick={() => handleTabClick(item)}
              soundType="hover"
              className={`px-3 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm tracking-[0.2em] transition-all duration-300 font-medium relative ${
                activeTab === item
                  ? "text-white bg-cyan-500/20 shadow-[0_0_20px_rgba(0,255,247,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              style={{
                fontFamily: "var(--font-orbitron)",
              }}
            >
              {item}
              {activeTab === item && (
                <motion.div
                  className="absolute inset-0 rounded-xl border border-cyan-400/50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </SoundButton>
          ))}
        </div>
      </nav>

      {/* Main content - responsivo */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-24 md:pt-32">
        {/* Neural brand identity */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-20"
        >
          {/* Brain wave visualization */}
          <div className="w-64 md:w-96 h-16 md:h-24 mb-8 md:mb-12">
            <BrainWave intensity={neuralActivity} />
          </div>

          {/* Neural logo */}
          <h1
            className="text-4xl md:text-8xl lg:text-9xl font-bold tracking-[0.4em] mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 uppercase"
            style={{
              fontFamily: "var(--font-orbitron)",
              filter: "drop-shadow(0 0 20px rgba(0, 255, 247, 0.5))",
            }}
          >
            DEM CLAIRE
          </h1>

          <div className="text-sm md:text-xl tracking-[0.8em] text-cyan-400/80 uppercase mb-2 md:mb-4">
            Neural Fashion Interface
          </div>
          <div className="text-xs md:text-sm tracking-[0.4em] text-gray-500 uppercase">
            Consciousness-Driven Commerce
          </div>
        </motion.div>

        {/* Neural access portal - responsivo */}
        <SoundButton onClick={handleEnter} soundType="connect" className="group relative">
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full relative overflow-hidden">
            {/* Outer neural ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-spin-slow" />

            {/* Neural interface */}
            <div className="absolute inset-4 md:inset-6 rounded-full bg-black/80 backdrop-blur-xl border border-cyan-500/40 flex items-center justify-center transition-all duration-500 group-hover:border-cyan-400/60">
              {/* Central consciousness */}
              <div className="relative z-10 text-center">
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 md:mb-6 mx-auto"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0, 255, 247, 0.5)",
                      "0 0 40px rgba(0, 255, 247, 0.8)",
                      "0 0 20px rgba(0, 255, 247, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-lg md:text-2xl font-light tracking-[0.4em] text-white/90 group-hover:text-white transition-colors duration-500">
                  CONNECT
                </span>
              </div>
            </div>

            {/* Neural pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </div>
        </SoundButton>

        {/* Neural status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-8 md:mt-16 space-y-4"
        >
          <div className="text-cyan-400/60 text-xs md:text-sm tracking-[0.4em] uppercase">Neural Status: Active</div>
          <div className="text-gray-500 text-xs tracking-[0.3em]">
            Synaptic Connections: {Math.floor(neuralActivity * 1000)}
          </div>
        </motion.div>
      </div>

      {/* Corner neural indicators - responsivo */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 text-xs tracking-[0.3em] text-cyan-400/50 font-light space-y-1">
        <div>NEURAL LINK</div>
        <div>PROTOCOL v2.1</div>
        <div className="text-green-400">● ONLINE</div>
      </div>

      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-xs tracking-[0.3em] text-cyan-400/50 text-right font-light space-y-1">
        <div>CONSCIOUSNESS</div>
        <div>COMMERCE</div>
        <div>INTERFACE</div>
      </div>

      {/* Floating neural particles - reduzido */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full pointer-events-none"
          style={{
            background: i % 2 === 0 ? "#00fff7" : "#8b5cf6",
            boxShadow: `0 0 10px ${i % 2 === 0 ? "#00fff7" : "#8b5cf6"}`,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}
