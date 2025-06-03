"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Cpu, Zap, ArrowLeft, Eye, Waves, Network } from "lucide-react"
import NeuralGrid from "@/components/neural-grid"
import NeuralTerminal from "@/components/neural-terminal"

export default function NeuralPage() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [neuralActivity, setNeuralActivity] = useState(1)
  const [selectedNeuron, setSelectedNeuron] = useState<number | null>(null)
  const [brainRegions, setBrainRegions] = useState([
    { name: "Prefrontal Cortex", activity: 87, color: "cyan" },
    { name: "Visual Cortex", activity: 92, color: "purple" },
    { name: "Motor Cortex", activity: 78, color: "green" },
    { name: "Temporal Lobe", activity: 85, color: "yellow" },
  ])
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      const activity = Math.min(3, Math.abs(e.movementX + e.movementY) / 30 + 0.5)
      setNeuralActivity(activity)
    }

    // Simulate brain activity fluctuations
    const interval = setInterval(() => {
      setBrainRegions((prev) =>
        prev.map((region) => ({
          ...region,
          activity: Math.max(60, Math.min(99, region.activity + (Math.random() - 0.5) * 10)),
        })),
      )
    }, 2000)

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  const handleNavigation = (path: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      router.push(path)
    }, 600)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-black text-white relative overflow-hidden"
      >
        {/* Neural background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10" />

        {/* Interactive neural field */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 50%)`,
            transition: "background 0.3s ease",
          }}
        />

        {/* Neural activity indicators */}
        <div className="absolute top-0 left-0 w-full h-2 bg-black/50">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            animate={{ width: `${neuralActivity * 33}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-purple-500/20 px-8 py-6 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleNavigation("/home")}
                className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-purple-400" />
              </button>
              <div>
                <h1
                  className="text-2xl font-bold tracking-[0.3em] text-purple-400 uppercase"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  NEURAL INTERFACE
                </h1>
                <div className="text-xs tracking-[0.2em] text-purple-400/60">CONSCIOUSNESS EXPLORATION</div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-xs text-purple-400/60">NEURAL ACTIVITY</div>
                <div className="text-lg font-bold text-purple-400">{(neuralActivity * 100).toFixed(0)}%</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-cyan-400/60">SYNAPSES</div>
                <div className="text-lg font-bold text-cyan-400">{Math.floor(neuralActivity * 1000)}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-extralight tracking-[0.3em] mb-8 text-gradient">NEURAL INTERFACE</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore the depths of artificial consciousness. Interface directly with neural networks, visualize thought
              patterns, and experience the future of human-AI collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Brain Visualization */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* 3D Brain Model */}
              <div className="rounded-3xl bg-glass border border-purple-500/30 p-8 backdrop-blur-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-400">Neural Cortex</h2>
                    <div className="text-sm text-purple-400/60">3D Brain Visualization</div>
                  </div>
                </div>

                {/* Brain regions */}
                <div className="relative h-80 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-2xl overflow-hidden border border-purple-500/20">
                  {/* Simulated brain outline */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                    <motion.path
                      d="M100 150 Q150 100 200 120 Q250 100 300 150 Q280 200 200 180 Q150 200 100 150"
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.5)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2 }}
                    />

                    {/* Neural activity points */}
                    {brainRegions.map((region, index) => (
                      <motion.circle
                        key={region.name}
                        cx={120 + index * 40}
                        cy={140 + Math.sin(index) * 20}
                        r="8"
                        fill={`rgba(${region.color === "cyan" ? "0, 255, 247" : region.color === "purple" ? "139, 92, 246" : region.color === "green" ? "34, 197, 94" : "234, 179, 8"}, 0.8)`}
                        className="cursor-pointer"
                        onClick={() => setSelectedNeuron(index)}
                        animate={{
                          scale: [1, region.activity / 70, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.5,
                        }}
                      />
                    ))}
                  </svg>

                  {/* Neural impulses */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-purple-400"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 3,
                      }}
                    />
                  ))}
                </div>

                {/* Brain region details */}
                {selectedNeuron !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-purple-500/20"
                  >
                    <h3 className="text-lg font-bold text-purple-400 mb-2">{brainRegions[selectedNeuron].name}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Activity Level</div>
                        <div className="text-white font-bold">{brainRegions[selectedNeuron].activity.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Frequency</div>
                        <div className="text-cyan-400 font-bold">{(Math.random() * 20 + 10).toFixed(1)} Hz</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Connections</div>
                        <div className="text-purple-400 font-bold">{Math.floor(Math.random() * 1000 + 500)}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Neural Grid */}
              <div className="rounded-3xl bg-glass border border-cyan-500/30 p-8 backdrop-blur-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <Network className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-400">Synaptic Network</h2>
                    <div className="text-sm text-cyan-400/60">Real-time Neural Connections</div>
                  </div>
                </div>
                <NeuralGrid />
              </div>
            </motion.div>

            {/* Control Panel */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              {/* Neural Controls */}
              <div className="rounded-3xl bg-glass border border-purple-500/30 p-6 backdrop-blur-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-purple-400">Neural Controls</h2>
                    <div className="text-xs text-purple-400/60">Consciousness Parameters</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {brainRegions.map((region, index) => (
                    <div key={region.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">{region.name}</span>
                        <span className="text-white font-bold">{region.activity.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${
                            region.color === "cyan"
                              ? "from-cyan-500 to-cyan-400"
                              : region.color === "purple"
                                ? "from-purple-500 to-purple-400"
                                : region.color === "green"
                                  ? "from-green-500 to-green-400"
                                  : "from-yellow-500 to-yellow-400"
                          }`}
                          animate={{ width: `${region.activity}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neural Sensors */}
              <div className="rounded-3xl bg-glass border border-cyan-500/30 p-6 backdrop-blur-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-cyan-400">Neural Sensors</h2>
                    <div className="text-xs text-cyan-400/60">Biometric Monitoring</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Heart Rate</span>
                    <span className="text-red-400 font-bold">{Math.floor(Math.random() * 20 + 70)} BPM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Eye Movement</span>
                    <span className="text-blue-400 font-bold">{Math.floor(Math.random() * 50 + 100)} Hz</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Stress Level</span>
                    <span className="text-green-400 font-bold">LOW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Focus Index</span>
                    <span className="text-purple-400 font-bold">{Math.floor(Math.random() * 30 + 70)}%</span>
                  </div>
                </div>
              </div>

              {/* Neural Terminal */}
              <div className="rounded-3xl bg-glass border border-purple-500/30 p-6 backdrop-blur-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Waves className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-purple-400">Neural Terminal</h2>
                    <div className="text-xs text-purple-400/60">Direct Interface</div>
                  </div>
                </div>
                <NeuralTerminal />
              </div>
            </motion.div>
          </div>

          {/* Neural Insights */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <div className="rounded-3xl bg-glass border border-purple-500/30 p-8 backdrop-blur-xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-400">Neural Insights</h2>
                  <div className="text-sm text-purple-400/60">Consciousness Analysis</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Cognitive Load</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Your neural pathways are operating at optimal efficiency. Consciousness integration is stable and
                    responsive.
                  </p>
                  <div className="mt-4 text-2xl font-bold text-purple-400">87.3%</div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <Network className="w-10 h-10 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Synaptic Density</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Neural connections are forming rapidly. Enhanced pattern recognition and creative thinking detected.
                  </p>
                  <div className="mt-4 text-2xl font-bold text-cyan-400">94.7%</div>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <Waves className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Neural Harmony</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Brain wave patterns show excellent synchronization. Optimal state for learning and consciousness
                    expansion.
                  </p>
                  <div className="mt-4 text-2xl font-bold text-green-400">91.2%</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-purple-500/20 p-8 text-center backdrop-blur-xl">
          <div className="text-xs tracking-[0.4em] text-gray-500 font-light">
            © 2025 DEM CLAIRE — NEURAL INTERFACE PROTOCOL v3.0
          </div>
          <div className="mt-2 text-xs text-purple-400/60">
            NEURAL ACTIVITY: {(neuralActivity * 100).toFixed(0)}% | SYNAPSES: {Math.floor(neuralActivity * 1000)} |
            STATUS: OPTIMAL
          </div>
        </footer>

        {/* Floating neural particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "rgba(139, 92, 246, 0.1)" : "rgba(0, 255, 247, 0.1)"
              } 0%, transparent 70%)`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              filter: "blur(20px)",
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 25 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
