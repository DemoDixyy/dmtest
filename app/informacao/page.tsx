"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function InformacaoPage() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    idPedido: "",
    email: "",
    assunto: "",
    mensagem: "",
  })
  const router = useRouter()

  const handleNavigation = (path: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      router.push(path)
    }, 300)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado:", formData)
    // Aqui você pode adicionar a lógica para enviar o formulário
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-black text-white relative"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-10">
            <div className="flex items-center">
              <div className="mr-4 p-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-lg">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="white">
                  <path d="M20 5 L23 15 L33 15 L25 21 L28 31 L20 25 L12 31 L15 21 L7 15 L17 15 Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-wider uppercase">Dem Calire</h1>
                <div className="text-xs text-gray-400 tracking-widest">DIVINE ESSENCE</div>
              </div>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => handleNavigation("/home")}
                className="px-8 py-3 text-gray-400 hover:text-white transition-colors text-sm rounded-2xl hover:bg-gray-800/50"
              >
                Produtos
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl text-sm shadow-lg">
                Informação
              </button>
            </nav>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <button className="bg-gradient-to-r from-white to-gray-100 text-black px-6 py-3 rounded-2xl text-sm flex items-center shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="font-medium">Carrinho (0)</span>
            </button>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors underline">
              Verificar Autenticidade
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex px-8 py-6 gap-8 h-[calc(100vh-120px)]">
          {/* Left Column - Privacy Policy */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700/50 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light">Política de Privacidade</h2>
              <span className="text-sm text-gray-400">Última atualização: 24/03/2025</span>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Esta Política de Privacidade descreve como a Dem Calire coleta, utiliza e divulga suas informações
                pessoais quando você visita, utiliza nossos serviços, realiza uma compra em demcalire.com ou se comunica
                conosco de outra forma (coletivamente, os "Serviços"). Para os fins desta Política de Privacidade,
                "você" e "seu" significam você como usuário dos Serviços, seja você um cliente, visitante do site ou
                outro indivíduo cujas informações coletamos de acordo com esta Política de Privacidade.
              </p>

              <p>
                Leia esta Política de Privacidade com atenção. Ao utilizar e acessar qualquer um dos Serviços, você
                concorda com a coleta, o uso e a divulgação de suas informações conforme descrito nesta Política de
                Privacidade. Caso não concorde com esta Política de Privacidade, não utilize ou acesse nenhum dos
                Serviços.
              </p>

              <h3 className="text-xl font-medium text-white mt-8 mb-4">Alterações a esta Política de Privacidade</h3>
              <p>
                Podemos atualizar nossa Política de Privacidade periodicamente, inclusive para refletir mudanças em
                nossas práticas ou por outros motivos operacionais, legais ou regulatórios. A política atualizada será
                publicada no Site e atualizaremos a data da "Última atualização". Também cumpriremos todas as medidas
                exigidas pela legislação aplicável ao realizar essas alterações.
              </p>

              <h3 className="text-xl font-medium text-white mt-8 mb-4">
                Como coletamos e usamos suas informações pessoais
              </h3>
              <p>
                Para fornecer os Serviços, coletamos e utilizamos suas informações pessoais. Com base em como você
                interage conosco, essas informações pessoais podem incluir: informações de contato como nome, endereço,
                número de telefone e endereço de e-mail; informações de pagamento como cartão de crédito ou débito e
                informações de cobrança; informações demográficas como idade, sexo e interesses.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Support Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-[400px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700/50"
          >
            <div className="bg-black rounded-2xl p-4 mb-6">
              <h3 className="text-lg font-medium text-white">Apoiar</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Nome"
                    className="w-full bg-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">ID do pedido</label>
                  <input
                    type="text"
                    name="idPedido"
                    value={formData.idPedido}
                    onChange={handleInputChange}
                    placeholder="ID do pedido"
                    className="w-full bg-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-mail"
                  className="w-full bg-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Assunto</label>
                <input
                  type="text"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  placeholder="Assunto"
                  className="w-full bg-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Escreva sua mensagem</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  placeholder="Mensagem"
                  rows={4}
                  className="w-full bg-gray-700 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl transition-colors duration-300 font-medium"
              >
                Envie seu tíquete de suporte
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 right-8 flex items-center space-x-6">
          <div className="text-sm text-gray-500 font-light">dem calire</div>
          <div className="text-sm text-gray-500">Dem Calire LLC</div>
          <div className="flex space-x-3">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
