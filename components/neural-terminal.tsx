"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TerminalLine {
  id: number
  text: string
  type: "input" | "output" | "system"
}

export default function NeuralTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 1, text: "NEURAL LINK INICIALIZADO...", type: "system" },
    { id: 2, text: "CONECTANDO AO MAINFRAME DEM CLAIRE...", type: "system" },
    { id: 3, text: "CONEXÃO ESTABELECIDA", type: "output" },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const systemResponses = [
    "PADRÃO NEURAL RECONHECIDO",
    "ACESSANDO DATABASE DE MODA...",
    "MATRIZ DE ESTILO QUÂNTICO CARREGADA",
    "SYNC DE CONSCIÊNCIA: 98.7%",
    "CATÁLOGO HOLOGRÁFICO DISPONÍVEL",
    "AUTENTICAÇÃO BIOMÉTRICA COMPLETA",
    "PROTOCOLO DE COMÉRCIO NEURAL ATIVO",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTyping && Math.random() > 0.7) {
        const response = systemResponses[Math.floor(Math.random() * systemResponses.length)]
        setLines((prev) => [...prev, { id: Date.now(), text: response, type: "system" }].slice(-8)) // Keep only last 8 lines
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isTyping])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim()) return

    setIsTyping(true)
    setLines((prev) => [...prev, { id: Date.now(), text: `> ${currentInput}`, type: "input" }])

    setTimeout(() => {
      const response = systemResponses[Math.floor(Math.random() * systemResponses.length)]
      setLines((prev) => [...prev, { id: Date.now() + 1, text: response, type: "output" }].slice(-8))
      setIsTyping(false)
    }, 1000)

    setCurrentInput("")
  }

  return (
    <div className="bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 font-mono">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-cyan-400 text-sm ml-2">neural_terminal.exe</span>
      </div>

      <div className="h-48 overflow-y-auto mb-4 space-y-2">
        <AnimatePresence>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`text-sm ${
                line.type === "input" ? "text-white" : line.type === "output" ? "text-cyan-400" : "text-purple-400"
              }`}
            >
              {line.text}
              {line.type === "system" && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-1"
                >
                  _
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-cyan-400">{">"}</span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 clickable"
          placeholder="Digite comando neural..."
          disabled={isTyping}
        />
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="text-cyan-400"
        >
          _
        </motion.span>
      </form>
    </div>
  )
}
