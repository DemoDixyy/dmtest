"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function InfoPage() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleNavigation = (path: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      router.push(path)
    }, 600)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Neural link established:", formData)
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10" />

        {/* Interactive mouse effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 50%)`,
            transition: "background 0.3s ease",
          }}
        />

        {/* Header */}
        <header className="relative z-10 border-b border-purple-500/20 px-8 py-8 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-20">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-purple-500/30 flex items-center justify-center holographic">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-light tracking-[0.3em] text-gradient">DEM CLAIRE</h1>
                  <div className="text-xs tracking-[0.4em] text-purple-400/70">HOLOGRAPHIC</div>
                </div>
              </div>

              <nav className="flex space-x-12">
                <button
                  onClick={() => handleNavigation("/home")}
                  className="text-sm tracking-[0.3em] text-purple-400/70 hover:text-white transition-colors pb-2 font-light"
                >
                  COLLECTION
                </button>
                <button className="text-sm tracking-[0.3em] border-b border-purple-500/50 pb-2 text-white font-light">
                  NEURAL NET
                </button>
              </nav>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="rounded-full bg-glass border border-purple-500/30 px-8 py-4 text-sm tracking-[0.3em] hover:border-purple-400/50 transition-all duration-300 backdrop-blur-xl holographic font-light"
            >
              CART [0]
            </motion.button>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-24"
          >
            <h1 className="text-7xl font-extralight tracking-[0.3em] mb-8 text-gradient">NEURAL NET</h1>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 gap-16">
            {/* Left Column - About */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-12"
            >
              <div className="rounded-3xl bg-glass border border-purple-500/30 p-10 backdrop-blur-xl holographic">
                <h2 className="text-3xl font-light tracking-[0.3em] mb-10 text-gradient">QUANTUM VISION</h2>
                <div className="space-y-8 text-purple-300/80 leading-relaxed font-light text-lg">
                  <p>
                    Dem Claire exists at the intersection of fashion and quantum reality. We create garments that
                    transcend physical limitations, existing simultaneously across multiple dimensions.
                  </p>
                  <p>
                    Our holographic approach merges neural interfaces with adaptive materials, creating pieces that
                    respond to consciousness, environment, and digital presence in real-time.
                  </p>
                  <p>
                    We believe fashion should evolve beyond static form, becoming a living extension of identity that
                    adapts, learns, and grows with the wearer.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-glass border border-purple-500/30 p-10 backdrop-blur-xl holographic">
                <h2 className="text-3xl font-light tracking-[0.3em] mb-10 text-gradient">CORE PROTOCOLS</h2>
                <div className="space-y-8">
                  <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-8 border border-purple-500/20">
                    <h3 className="font-medium tracking-[0.2em] mb-4 text-white text-xl">QUANTUM INNOVATION</h3>
                    <p className="text-purple-300/80 font-light">
                      Pioneering the convergence of consciousness and couture
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8 border border-cyan-500/20">
                    <h3 className="font-medium tracking-[0.2em] mb-4 text-white text-xl">NEURAL ADAPTATION</h3>
                    <p className="text-cyan-300/80 font-light">Creating pieces that evolve with your consciousness</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-8 border border-purple-500/20">
                    <h3 className="font-medium tracking-[0.2em] mb-4 text-white text-xl">DIMENSIONAL SUSTAINABILITY</h3>
                    <p className="text-purple-300/80 font-light">Minimizing impact across all planes of existence</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="rounded-3xl bg-glass border border-purple-500/30 p-10 backdrop-blur-xl holographic"
            >
              <h2 className="text-3xl font-light tracking-[0.3em] mb-10 text-gradient text-center">NEURAL LINK</h2>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="IDENTITY.NAME"
                    className="w-full rounded-full bg-black/30 border border-purple-500/30 px-8 py-5 text-sm tracking-[0.2em] focus:border-purple-400/50 transition-colors backdrop-blur-sm font-light placeholder-purple-400/50"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="NEURAL.ADDRESS"
                    className="w-full rounded-full bg-black/30 border border-purple-500/30 px-8 py-5 text-sm tracking-[0.2em] focus:border-purple-400/50 transition-colors backdrop-blur-sm font-light placeholder-purple-400/50"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="TRANSMISSION.SUBJECT"
                    className="w-full rounded-full bg-black/30 border border-purple-500/30 px-8 py-5 text-sm tracking-[0.2em] focus:border-purple-400/50 transition-colors backdrop-blur-sm font-light placeholder-purple-400/50"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="QUANTUM.MESSAGE"
                    rows={5}
                    className="w-full rounded-3xl bg-black/30 border border-purple-500/30 px-8 py-5 text-sm tracking-[0.2em] focus:border-purple-400/50 transition-colors backdrop-blur-sm font-light placeholder-purple-400/50 resize-none"
                  />
                </div>

                <div className="pt-6">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 hover:from-purple-500/50 hover:to-cyan-500/50 border border-purple-500/30 hover:border-purple-400/50 py-5 text-sm tracking-[0.3em] transition-all duration-300 backdrop-blur-sm font-light"
                  >
                    ESTABLISH CONNECTION
                  </motion.button>
                </div>
              </form>

              <div className="mt-16 pt-10 border-t border-purple-500/20 text-center">
                <div className="space-y-4 text-sm text-purple-300/70 font-light">
                  <div>neural@demclaire.quantum</div>
                  <div>+1 (555) QUANTUM</div>
                  <div className="pt-6">
                    <div>123 Holographic Avenue</div>
                    <div>Quantum District, Reality 10001</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Manifesto Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-24 text-center"
          >
            <div className="rounded-3xl bg-glass border border-purple-500/30 p-20 backdrop-blur-xl holographic">
              <blockquote className="text-4xl font-extralight tracking-[0.3em] leading-relaxed text-gradient mb-8">
                "Fashion transcends reality when consciousness becomes the canvas"
              </blockquote>
              <div className="text-sm tracking-[0.5em] text-purple-400/50 font-light">— QUANTUM MANIFESTO</div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-purple-500/20 p-8 text-center backdrop-blur-xl">
          <div className="text-xs tracking-[0.4em] text-purple-400/50 font-light">
            © 2025 DEM CLAIRE — HOLOGRAPHIC FASHION COLLECTIVE
          </div>
        </footer>

        {/* Floating holographic elements */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "rgba(139, 92, 246, 0.08)" : "rgba(6, 182, 212, 0.08)"
              } 0%, transparent 70%)`,
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              filter: "blur(40px)",
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
              duration: Math.random() * 25 + 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
