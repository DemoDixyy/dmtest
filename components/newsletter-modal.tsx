"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Zap, Gift, Star } from "lucide-react"
import SoundButton from "@/components/sound-button"
import BrainWave from "@/components/brain-wave"

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
  type: "newsletter" | "presale"
}

export default function NewsletterModal({ isOpen, onClose, type }: NewsletterModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setEmail("")
      }, 2000)
    }, 1500)
  }

  const isNewsletter = type === "newsletter"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:h-auto bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-3xl z-50 overflow-hidden"
          >
            {isSuccess ? (
              // Success State
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-cyan-500 mx-auto mb-6 flex items-center justify-center"
                >
                  <Star className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-green-400 mb-4 tracking-[0.2em]">CONEXÃO ESTABELECIDA!</h2>

                <p className="text-gray-300 mb-6">
                  {isNewsletter
                    ? "Você está conectado à nossa rede neural. Prepare-se para receber as últimas atualizações!"
                    : "Bem-vindo ao círculo interno! Você receberá acesso prioritário e mimos exclusivos."}
                </p>

                <div className="w-full h-16">
                  <BrainWave intensity={2} className="h-full" />
                </div>
              </div>
            ) : (
              // Form State
              <>
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-cyan-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full ${
                          isNewsletter
                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                            : "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                        } flex items-center justify-center`}
                      >
                        {isNewsletter ? (
                          <Mail className="w-6 h-6 text-cyan-400" />
                        ) : (
                          <Gift className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white tracking-[0.2em]">
                          {isNewsletter ? "NEURAL NEWSLETTER" : "PRÉ-VENDA EXCLUSIVA"}
                        </h2>
                        <div className="text-sm text-gray-400">
                          {isNewsletter ? "Conecte-se às novidades" : "Acesso prioritário"}
                        </div>
                      </div>
                    </div>
                    <SoundButton
                      onClick={onClose}
                      soundType="click"
                      className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </SoundButton>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {isNewsletter ? (
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-cyan-400 mb-4">CONECTE-SE À NOSSA REDE NEURAL</h3>
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-center space-x-3">
                          <Zap className="w-4 h-4 text-cyan-400" />
                          <span>Novidades em primeira mão</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Zap className="w-4 h-4 text-cyan-400" />
                          <span>Lançamentos exclusivos</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Zap className="w-4 h-4 text-cyan-400" />
                          <span>Descontos neurais especiais</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Zap className="w-4 h-4 text-cyan-400" />
                          <span>Conteúdo exclusivo da comunidade</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-purple-400 mb-4">CÍRCULO INTERNO DA PRÉ-VENDA</h3>
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-center space-x-3">
                          <Gift className="w-4 h-4 text-purple-400" />
                          <span>Acesso 48h antes do lançamento</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Gift className="w-4 h-4 text-purple-400" />
                          <span>Desconto de 25% exclusivo</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Gift className="w-4 h-4 text-purple-400" />
                          <span>Brinde neural surpresa</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Gift className="w-4 h-4 text-purple-400" />
                          <span>Frete grátis garantido</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">SEU EMAIL NEURAL</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <SoundButton
                      type="submit"
                      disabled={isSubmitting || !email}
                      soundType="success"
                      className={`w-full py-4 rounded-xl font-bold tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isNewsletter
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                          : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                          />
                          <span>CONECTANDO...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>{isNewsletter ? "CONECTAR À REDE" : "ENTRAR NO CÍRCULO"}</span>
                        </>
                      )}
                    </SoundButton>
                  </form>

                  <div className="mt-6 text-xs text-gray-500 text-center">
                    Seus dados estão protegidos por criptografia neural de última geração.
                    <br />
                    Você pode cancelar a qualquer momento.
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
