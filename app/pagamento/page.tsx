"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle, Eye, EyeOff, MapPin, User, Mail, Phone } from "lucide-react"

export default function PagamentoPage() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [showCVV, setShowCVV] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    cpf: "",

    // Endereço
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",

    // Pagamento
    numeroCartao: "",
    nomeCartao: "",
    validade: "",
    cvv: "",
    parcelas: "1",

    // Preferências
    newsletter: true,
    termos: false,
  })
  const router = useRouter()

  const handleNavigation = (path: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      router.push(path)
    }, 600)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1")
  }

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1")
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    alert("Pagamento processado com sucesso!")
    handleNavigation("/home")
  }

  const steps = [
    { id: 1, title: "Dados Pessoais", description: "Informações básicas" },
    { id: 2, title: "Endereço", description: "Dados de entrega" },
    { id: 3, title: "Pagamento", description: "Método de pagamento" },
    { id: 4, title: "Confirmação", description: "Revisar pedido" },
  ]

  const mockCartItems = [
    { id: 1, name: "Neural Jacket", price: 520, quantity: 1 },
    { id: 2, name: "Synaptic Hoodie", price: 380, quantity: 2 },
  ]

  const total = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-black text-white relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-black to-purple-900/10" />

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
                  PAGAMENTO NEURAL
                </h1>
                <div className="text-xs tracking-[0.2em] text-cyan-400/60">FINALIZAÇÃO SEGURA</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Shield className="w-6 h-6 text-green-400" />
              <div className="text-right">
                <div className="text-sm font-bold text-green-400">Conexão Segura</div>
                <div className="text-xs text-green-400/60">SSL 256-bit</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Progress Steps */}
            <div className="lg:col-span-2">
              {/* Step Indicator */}
              <div className="mb-12">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          currentStep >= step.id
                            ? "bg-cyan-500 border-cyan-500 text-black"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="font-bold">{step.id}</span>
                        )}
                      </div>
                      <div className="ml-3">
                        <div
                          className={`text-sm font-medium ${currentStep >= step.id ? "text-white" : "text-gray-400"}`}
                        >
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-500">{step.description}</div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-px mx-8 ${currentStep > step.id ? "bg-cyan-500" : "bg-gray-600"}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/50 rounded-3xl p-8 border border-cyan-500/30 backdrop-blur-xl"
              >
                {/* Step 1: Dados Pessoais */}
                {currentStep === 1 && (
                  <div>
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-cyan-400">Dados Pessoais</h2>
                        <div className="text-sm text-cyan-400/60">Informações básicas para o pedido</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                        <input
                          type="text"
                          value={formData.nome}
                          onChange={(e) => handleInputChange("nome", e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Sobrenome</label>
                        <input
                          type="text"
                          value={formData.sobrenome}
                          onChange={(e) => handleInputChange("sobrenome", e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                          placeholder="Seu sobrenome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) => handleInputChange("telefone", formatPhone(e.target.value))}
                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">CPF</label>
                        <input
                          type="text"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                          placeholder="000.000.000-00"
                          maxLength={14}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Endereço */}
                {currentStep === 2 && (
                  <div>
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-purple-400">Endereço de Entrega</h2>
                        <div className="text-sm text-purple-400/60">Onde você quer receber seus produtos</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">CEP</label>
                        <input
                          type="text"
                          value={formData.cep}
                          onChange={(e) => handleInputChange("cep", formatCEP(e.target.value))}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
                          placeholder="00000-000"
                          maxLength={9}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                        <select
                          value={formData.estado}
                          onChange={(e) => handleInputChange("estado", e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
                        >
                          <option value="">Selecione</option>
                          <option value="SP">São Paulo</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="RS">Rio Grande do Sul</option>
                          {/* Adicionar outros estados */}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Endereço</label>
                        <input
                          type="text"
                          value={formData.endereco}
                          onChange={(e) => handleInputChange("endereco", e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
                          placeholder="Rua, Avenida, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Número</label>
                        <input
                          type="text"
                          value={formData.numero}
                          onChange={(e) => handleInputChange("numero", e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
                          placeholder="123"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Complemento</label>
                        <input
                          type="text"
                          value={formData.complemento}
                          onChange={(e) => handleInputChange("complemento", e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
                          placeholder="Apto, Bloco, etc. (opcional)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Bairro</label>
                        <input
                          type="text"
                          value={formData.bairro}
                          onChange={(e) => handleInputChange("bairro", e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
                          placeholder="Nome do bairro"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Cidade</label>
                        <input
                          type="text"
                          value={formData.cidade}
                          onChange={(e) => handleInputChange("cidade", e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors"
                          placeholder="Nome da cidade"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Pagamento */}
                {currentStep === 3 && (
                  <div>
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-green-400">Dados do Cartão</h2>
                        <div className="text-sm text-green-400/60">Informações de pagamento seguras</div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Número do Cartão</label>
                        <div className="relative">
                          <input
                            type={showCardNumber ? "text" : "password"}
                            value={formData.numeroCartao}
                            onChange={(e) => handleInputChange("numeroCartao", formatCardNumber(e.target.value))}
                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 pr-12 text-white focus:border-green-500/50 focus:outline-none transition-colors"
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                          />
                          <button
                            type="button"
                            onClick={() => setShowCardNumber(!showCardNumber)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          >
                            {showCardNumber ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Nome no Cartão</label>
                        <input
                          type="text"
                          value={formData.nomeCartao}
                          onChange={(e) => handleInputChange("nomeCartao", e.target.value.toUpperCase())}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-green-500/50 focus:outline-none transition-colors"
                          placeholder="NOME COMO ESTÁ NO CARTÃO"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Validade</label>
                          <input
                            type="text"
                            value={formData.validade}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "")
                              if (value.length >= 2) {
                                value = value.substring(0, 2) + "/" + value.substring(2, 4)
                              }
                              handleInputChange("validade", value)
                            }}
                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-green-500/50 focus:outline-none transition-colors"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                          <div className="relative">
                            <input
                              type={showCVV ? "text" : "password"}
                              value={formData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 pr-12 text-white focus:border-green-500/50 focus:outline-none transition-colors"
                              placeholder="000"
                              maxLength={4}
                            />
                            <button
                              type="button"
                              onClick={() => setShowCVV(!showCVV)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                              {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Parcelas</label>
                        <select
                          value={formData.parcelas}
                          onChange={(e) => handleInputChange("parcelas", e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:border-green-500/50 focus:outline-none transition-colors"
                        >
                          <option value="1">1x de €{total.toFixed(2)} sem juros</option>
                          <option value="2">2x de €{(total / 2).toFixed(2)} sem juros</option>
                          <option value="3">3x de €{(total / 3).toFixed(2)} sem juros</option>
                          <option value="6">6x de €{(total / 6).toFixed(2)} sem juros</option>
                          <option value="12">12x de €{(total / 12).toFixed(2)} sem juros</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmação */}
                {currentStep === 4 && (
                  <div>
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-yellow-400">Confirmação do Pedido</h2>
                        <div className="text-sm text-yellow-400/60">Revise todas as informações</div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Dados Pessoais */}
                      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                        <h3 className="text-lg font-bold text-white mb-4">Dados Pessoais</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Nome:</span>
                            <span className="text-white ml-2">
                              {formData.nome} {formData.sobrenome}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white ml-2">{formData.email}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Telefone:</span>
                            <span className="text-white ml-2">{formData.telefone}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">CPF:</span>
                            <span className="text-white ml-2">{formData.cpf}</span>
                          </div>
                        </div>
                      </div>

                      {/* Endereço */}
                      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                        <h3 className="text-lg font-bold text-white mb-4">Endereço de Entrega</h3>
                        <div className="text-sm text-gray-300">
                          {formData.endereco}, {formData.numero} {formData.complemento && `- ${formData.complemento}`}
                          <br />
                          {formData.bairro} - {formData.cidade}/{formData.estado}
                          <br />
                          CEP: {formData.cep}
                        </div>
                      </div>

                      {/* Pagamento */}
                      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                        <h3 className="text-lg font-bold text-white mb-4">Forma de Pagamento</h3>
                        <div className="text-sm">
                          <div className="text-gray-400">Cartão de Crédito</div>
                          <div className="text-white">**** **** **** {formData.numeroCartao.slice(-4)}</div>
                          <div className="text-gray-400">
                            {formData.parcelas}x de €{(total / Number.parseInt(formData.parcelas)).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Termos */}
                      <div className="space-y-4">
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.newsletter}
                            onChange={(e) => handleInputChange("newsletter", e.target.checked)}
                            className="mt-1 w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                          />
                          <span className="text-sm text-gray-300">
                            Quero receber novidades e ofertas exclusivas da Dem Claire
                          </span>
                        </label>

                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.termos}
                            onChange={(e) => handleInputChange("termos", e.target.checked)}
                            className="mt-1 w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                          />
                          <span className="text-sm text-gray-300">
                            Li e aceito os <span className="text-cyan-400 underline cursor-pointer">Termos de Uso</span>{" "}
                            e a <span className="text-cyan-400 underline cursor-pointer">Política de Privacidade</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-700/50">
                  {currentStep > 1 && (
                    <motion.button
                      onClick={handlePrevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
                    >
                      Voltar
                    </motion.button>
                  )}

                  <div className="ml-auto">
                    {currentStep < 4 ? (
                      <motion.button
                        onClick={handleNextStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-bold tracking-[0.1em] transition-all duration-300"
                        style={{ fontFamily: "var(--font-orbitron)" }}
                      >
                        Continuar
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={handleSubmit}
                        disabled={!formData.termos || isProcessing}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-8 py-3 rounded-xl font-bold tracking-[0.1em] transition-all duration-300 ${
                          !formData.termos || isProcessing
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        }`}
                        style={{ fontFamily: "var(--font-orbitron)" }}
                      >
                        {isProcessing ? "PROCESSANDO..." : "FINALIZAR COMPRA"}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 rounded-3xl p-8 border border-cyan-500/30 backdrop-blur-xl sticky top-8">
                <h3 className="text-xl font-bold text-cyan-400 mb-6">Resumo do Pedido</h3>

                <div className="space-y-4 mb-6">
                  {mockCartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-sm text-gray-400">Qtd: {item.quantity}</div>
                      </div>
                      <div className="text-cyan-400 font-bold">€{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700/50 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-white">€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Frete:</span>
                    <span className="text-green-400">Grátis</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-700/50 pt-3">
                    <span className="text-white">Total:</span>
                    <span className="text-cyan-400">€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Info */}
                <div className="mt-8 p-4 bg-gradient-to-r from-green-900/20 to-cyan-900/20 rounded-xl border border-green-500/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <Lock className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-bold text-green-400">Compra 100% Segura</span>
                  </div>
                  <div className="text-xs text-green-400/80 space-y-1">
                    <div>• Criptografia SSL 256-bit</div>
                    <div>• Dados protegidos</div>
                    <div>• Certificado de segurança</div>
                  </div>
                </div>

                {/* Accepted Cards */}
                <div className="mt-6">
                  <div className="text-sm text-gray-400 mb-3">Cartões aceitos:</div>
                  <div className="flex space-x-2">
                    {["💳", "🏧", "💰", "🔒"].map((icon, index) => (
                      <div
                        key={index}
                        className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-sm"
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-cyan-500/20 p-8 text-center backdrop-blur-xl">
          <div className="text-xs tracking-[0.4em] text-gray-500 font-light">
            © 2025 DEM CLAIRE — PAGAMENTO SEGURO NEURAL
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  )
}
