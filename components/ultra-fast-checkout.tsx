"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Zap, Shield, Clock, CheckCircle } from "lucide-react"
import PriceCounter from "./price-counter"
import SoundButton from "./sound-button"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  consciousness_level: number
  neural_id: string
  status: string
}

interface UltraFastCheckoutProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  total: number
}

const paymentMethods = [
  {
    id: "pix",
    name: "PIX",
    icon: "🇧🇷",
    description: "Pagamento instantâneo brasileiro",
    time: "Imediato",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: "🍎",
    description: "Touch ID ou Face ID",
    time: "1 clique",
    color: "from-gray-700 to-gray-900",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: "🔵",
    description: "Carteira segura do Google",
    time: "1 clique",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "crypto",
    name: "Neural Crypto",
    icon: "₿",
    description: "Bitcoin, ETH, USDC",
    time: "Instantâneo",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "card",
    name: "Cartão de Crédito",
    icon: "💳",
    description: "Visa, Mastercard, Amex",
    time: "2 segundos",
    color: "from-purple-500 to-pink-500",
  },
]

export default function UltraFastCheckout({ isOpen, onClose, items, total }: UltraFastCheckoutProps) {
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1) // 1: Payment, 2: Processing, 3: Complete

  const handlePayment = useCallback(async () => {
    setIsProcessing(true)
    setStep(2)

    // Simulate ultra-fast payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsComplete(true)
    setStep(3)

    // Auto-close after success
    setTimeout(() => {
      onClose()
      setStep(1)
      setIsComplete(false)
    }, 4000)
  }, [onClose])

  const memoizedItems = useMemo(() => items, [items])

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

          {/* Checkout Modal - responsivo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 max-w-2xl mx-auto my-auto h-fit max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-3xl z-50"
          >
            {step === 1 && (
              <>
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-cyan-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h2
                          className="text-lg md:text-2xl font-bold text-cyan-400 tracking-[0.2em]"
                          style={{ fontFamily: "var(--font-orbitron)" }}
                        >
                          CHECKOUT ULTRA-RÁPIDO
                        </h2>
                        <div className="text-xs md:text-sm text-cyan-400/60">Protocolo de Comércio Neural</div>
                      </div>
                    </div>
                    <SoundButton
                      onClick={onClose}
                      soundType="click"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    </SoundButton>
                  </div>

                  {/* Speed Indicator */}
                  <div className="mt-4 md:mt-6 flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gradient-to-r from-green-900/20 to-cyan-900/20 rounded-xl border border-green-500/20">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                    <div>
                      <div className="text-sm font-bold text-green-400">Modo Ultra-Rápido Ativo</div>
                      <div className="text-xs text-green-400/60">Complete sua compra em menos de 10 segundos</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                  {/* Order Summary */}
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-4">Resumo do Pedido Neural</h3>
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="space-y-3">
                        {memoizedItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <div className="text-white font-medium text-sm md:text-base">{item.name}</div>
                              <div className="text-xs text-gray-400">
                                Qtd: {item.quantity} • {item.consciousness_level}% Consciente
                              </div>
                            </div>
                            <div className="text-cyan-400 font-bold text-sm md:text-base">
                              <PriceCounter targetPrice={item.price * item.quantity} duration={2000} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-700/50 mt-4 pt-4 flex justify-between items-center">
                        <span className="text-base md:text-lg font-bold text-white">Valor Total Neural:</span>
                        <span className="text-xl md:text-2xl font-bold text-cyan-400">
                          <PriceCounter targetPrice={total} duration={3000} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email para Recibo Neural</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.neural"
                      className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none transition-colors text-sm md:text-base"
                    />
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-4">Escolha o Pagamento Neural</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {paymentMethods.map((method) => (
                        <SoundButton
                          key={method.id}
                          onClick={() => setSelectedPayment(method)}
                          soundType="click"
                          className={`p-3 md:p-4 rounded-xl border transition-all duration-300 text-left ${
                            selectedPayment.id === method.id
                              ? `bg-gradient-to-r ${method.color} border-white/30`
                              : "bg-gray-900/30 border-gray-700/50 hover:border-gray-600/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 md:space-x-4">
                              <span className="text-xl md:text-2xl">{method.icon}</span>
                              <div>
                                <div className="font-bold text-white text-sm md:text-base">{method.name}</div>
                                <div className="text-xs md:text-sm text-gray-300">{method.description}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs md:text-sm font-bold text-green-400">{method.time}</div>
                              <div className="text-xs text-gray-400">Processamento</div>
                            </div>
                          </div>
                        </SoundButton>
                      ))}
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="p-3 md:p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                      <div>
                        <div className="text-sm font-bold text-blue-400">Segurança Neural Ativa</div>
                        <div className="text-xs text-blue-400/60">
                          Criptografia 256-bit • Consciência verificada • Garantia zero fraude
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <SoundButton
                    onClick={handlePayment}
                    disabled={!email || isProcessing}
                    soundType="success"
                    className={`w-full py-3 md:py-4 rounded-xl font-bold tracking-[0.1em] transition-all duration-300 text-sm md:text-base ${
                      !email || isProcessing
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : `bg-gradient-to-r ${selectedPayment.color} text-white hover:shadow-lg`
                    }`}
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    {isProcessing
                      ? "PROCESSANDO..."
                      : `PAGAR €${total.toFixed(2)} COM ${selectedPayment.name.toUpperCase()}`}
                  </SoundButton>

                  <div className="text-xs text-center text-gray-500 mt-4">
                    Ao completar esta compra, você concorda com nossos Termos Neurais e Política de Consciência
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="p-12 md:p-16 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-16 h-16 md:w-20 md:h-20 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full mx-auto mb-6 md:mb-8"
                />
                <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">Processando Transação Neural</h2>
                <div className="text-gray-400 mb-6 md:mb-8">Sincronizando com a rede de consciência...</div>

                <div className="space-y-4 text-sm text-gray-300">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Método de pagamento verificado</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Compatibilidade neural confirmada</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Sincronização de consciência completa</span>
                  </motion.div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-12 md:p-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
                >
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-4">Transação Neural Completa!</h2>
                <div className="text-gray-400 mb-6 md:mb-8">
                  Sua compra dirigida pela consciência foi processada com sucesso.
                </div>

                <div className="bg-gray-900/50 rounded-xl p-4 md:p-6 border border-green-500/20 mb-6 md:mb-8">
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>
                      ID do Pedido:{" "}
                      <span className="text-cyan-400 font-mono">NC-{Date.now().toString().slice(-8)}</span>
                    </div>
                    <div>
                      Pagamento: <span className="text-green-400">{selectedPayment.name}</span>
                    </div>
                    <div>
                      Total: <span className="text-white font-bold">€{total.toFixed(2)}</span>
                    </div>
                    <div>
                      Recibo Neural: <span className="text-cyan-400">{email}</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">Fechando automaticamente em alguns segundos...</div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
