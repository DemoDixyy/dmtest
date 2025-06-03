"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Wifi, Brain, Activity, Users, Globe, ArrowLeft } from "lucide-react"
import BrainWave from "@/components/brain-wave"

export default function SyncPage() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [syncProgress, setSyncProgress] = useState(0)
  const [connectedUsers, setConnectedUsers] = useState(1247)
  const [globalSync, setGlobalSync] = useState(89.7)
  const [isConnecting, setIsConnecting] = useState(false)
  const [neuralNodes, setNeuralNodes] = useState<Array<{ id: number; x: number; y: number; active: boolean }>>([])
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Initialize neural nodes
    const nodes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      active: Math.random() > 0.7,
    }))
    setNeuralNodes(nodes)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setConnectedUsers((prev) => prev + Math.floor(Math.random() * 10 - 5))
      setGlobalSync((prev) => {
        const change = (Math.random() - 0.5) * 2
        return Math.max(75, Math.min(99.9, prev + change))
      })

      // Update neural nodes
      setNeuralNodes((prev) =>
        prev.map((node) => ({
          ...node,
          active: Math.random() > 0.6,
        })),
      )
    }, 3000)

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

  const handleSync = async () => {
    setIsConnecting(true)
    setSyncProgress(0)

    // Simulate sync process
    for (let i = 0; i <= 100; i += 2) {
      await new Promise((resolve) => setTimeout(resolve, 50))
      setSyncProgress(i)
    }

    setIsConnecting(false)
    alert("Neural sync complete! Consciousness level optimized.")
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
        {/* Dynamic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-black to-purple-900/10" />

        {/* Neural network visualization */}
        <div className="absolute inset-0 overflow-hidden">
          {neuralNodes.map((node) => (
            <motion.div
              key={node.id}
              className={`absolute w-2 h-2 rounded-full ${
                node.active ? "bg-cyan-400 shadow-[0_0_10px_#00fff7]" : "bg-gray-600"
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              animate={{
                scale: node.active ? [1, 1.5, 1] : 1,
                opacity: node.active ? [0.5, 1, 0.5] : 0.3,
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          ))}

          {/* Neural connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {neuralNodes.map((node, index) => {
              if (index === neuralNodes.length - 1) return null
              const nextNode = neuralNodes[index + 1]
              return (
                <motion.line
                  key={`${node.id}-${nextNode.id}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${nextNode.x}%`}
                  y2={`${nextNode.y}%`}
                  stroke="rgba(0, 255, 247, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: node.active && nextNode.active ? 1 : 0 }}
                  transition={{ duration: 2 }}
                />
              )
            })}
          </svg>
        </div>

        {/* Interactive mouse effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 247, 0.15), transparent 40%)`,
            transition: "background 0.3s ease",
          }}
        />

        {/* Header */}
        <header className="relative z-10 border-b border-cyan-500/20 px-8 py-6 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleNavigation("/home")}
                className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-cyan-400" />
              </button>
              <div>
                <h1
                  className="text-2xl font-bold tracking-[0.3em] text-cyan-400 uppercase"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  NEURAL SYNC
                </h1>
                <div className="text-xs tracking-[0.2em] text-cyan-400/60">CONSCIOUSNESS SYNCHRONIZATION</div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-xs text-cyan-400/60">GLOBAL SYNC</div>
                <div className="text-lg font-bold text-cyan-400">{globalSync.toFixed(1)}%</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-cyan-400/60">CONNECTED</div>
                <div className="text-lg font-bold text-purple-400">{connectedUsers.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-extralight tracking-[0.3em] mb-8 text-gradient">NEURAL SYNC</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Connect your consciousness to the global neural network. Synchronize your thoughts, enhance your
              perception, and join the collective intelligence of fashion-forward minds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sync Interface */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Sync Control */}
              <div className="rounded-3xl bg-glass border border-cyan-500/30 p-8 backdrop-blur-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <Wifi className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-400">Sync Control</h2>
                    <div className="text-sm text-cyan-400/60">Neural Interface v2.1</div>
                  </div>
                </div>

                {/* Sync Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Consciousness Sync</span>
                    <span>{syncProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      animate={{ width: `${syncProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Sync Button */}
                <motion.button
                  onClick={handleSync}
                  disabled={isConnecting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold tracking-[0.2em] transition-all duration-300 ${
                    isConnecting
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:from-cyan-400 hover:to-purple-400"
                  }`}
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {isConnecting ? "SYNCHRONIZING..." : "INITIATE NEURAL SYNC"}
                </motion.button>
              </div>

              {/* Neural Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-glass border border-cyan-500/30 p-6 backdrop-blur-xl text-center">
                  <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">94.7%</div>
                  <div className="text-sm text-cyan-400/60">Neural Efficiency</div>
                </div>
                <div className="rounded-2xl bg-glass border border-cyan-500/30 p-6 backdrop-blur-xl text-center">
                  <Activity className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">8.2Hz</div>
                  <div className="text-sm text-purple-400/60">Alpha Waves</div>
                </div>
              </div>
            </motion.div>

            {/* Global Network */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              {/* Brain Wave Monitor */}
              <div className="rounded-3xl bg-glass border border-cyan-500/30 p-8 backdrop-blur-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-purple-400">Brain Wave Monitor</h2>
                    <div className="text-sm text-purple-400/60">Real-time Neural Activity</div>
                  </div>
                </div>

                <BrainWave intensity={1.5} className="h-32 mb-6" />

                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-cyan-400">8.2Hz</div>
                    <div className="text-xs text-gray-400">ALPHA</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">18.7Hz</div>
                    <div className="text-xs text-gray-400">BETA</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">4.1Hz</div>
                    <div className="text-xs text-gray-400">THETA</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-yellow-400">35.2Hz</div>
                    <div className="text-xs text-gray-400">GAMMA</div>
                  </div>
                </div>
              </div>

              {/* Global Network Status */}
              <div className="rounded-3xl bg-glass border border-cyan-500/30 p-8 backdrop-blur-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-green-400">Global Network</h2>
                    <div className="text-sm text-green-400/60">Worldwide Consciousness Grid</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Connected Minds</span>
                    <span className="text-white font-bold">{connectedUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Global Sync Rate</span>
                    <span className="text-cyan-400 font-bold">{globalSync.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Neural Bandwidth</span>
                    <span className="text-purple-400 font-bold">847.2 TB/s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Quantum Entanglement</span>
                    <span className="text-green-400 font-bold">STABLE</span>
                  </div>
                </div>

                {/* Network Activity */}
                <div className="mt-6">
                  <div className="text-sm text-gray-400 mb-2">Network Activity</div>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-8 bg-gradient-to-t from-cyan-500/20 to-purple-500/20 rounded"
                        animate={{
                          scaleY: [0.3, Math.random() * 0.7 + 0.3, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Connected Users */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <div className="rounded-3xl bg-glass border border-cyan-500/30 p-8 backdrop-blur-xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-cyan-400">Recently Connected</h2>
                  <div className="text-sm text-cyan-400/60">Neural Network Participants</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Neural_User_001", sync: 96.7, location: "Neo Tokyo" },
                  { name: "Consciousness_Alpha", sync: 94.2, location: "Cyber London" },
                  { name: "Mind_Link_Beta", sync: 91.8, location: "Digital NYC" },
                  { name: "Synaptic_Gamma", sync: 89.4, location: "Virtual Berlin" },
                  { name: "Neural_Delta", sync: 87.1, location: "Quantum Paris" },
                  { name: "Brain_Wave_Epsilon", sync: 85.6, location: "Holo Seoul" },
                ].map((user, index) => (
                  <motion.div
                    key={user.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="bg-gray-900/50 rounded-xl p-4 border border-cyan-500/20"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-cyan-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{user.name}</div>
                        <div className="text-gray-400 text-xs">{user.location}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Sync Rate</span>
                      <span className="text-cyan-400 font-bold text-sm">{user.sync}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${user.sync}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-cyan-500/20 p-8 text-center backdrop-blur-xl">
          <div className="text-xs tracking-[0.4em] text-gray-500 font-light">
            © 2025 DEM CLAIRE — NEURAL SYNCHRONIZATION PROTOCOL v2.1
          </div>
          <div className="mt-2 text-xs text-cyan-400/60">
            GLOBAL SYNC: {globalSync.toFixed(1)}% | CONNECTED MINDS: {connectedUsers.toLocaleString()} | STATUS: ACTIVE
          </div>
        </footer>

        {/* Floating neural particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "rgba(0, 255, 247, 0.1)" : "rgba(139, 92, 246, 0.1)"
              } 0%, transparent 70%)`,
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              filter: "blur(30px)",
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
