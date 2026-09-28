"use client"

import React, { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Sparkles, Loader2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Button } from "@/shared/ui/button"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function CopilotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Sou seu Copiloto de Sustentabilidade EcoTrack AI. Quer dicas de como reduzir sua pegada de carbono hoje?"
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Mock de chamada para LLM
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Nossa análise mostra que trocar o transporte individual pelo metrô por apenas **2 dias** na semana reduz sua pegada em cerca de `5 kg de CO₂`. Além disso, você ganha +100 EcoPoints!\n\nPosso te ajudar a registrar seu primeiro bilhete?"
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1800)
  }

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 md:bottom-6 right-4 md:right-6 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform z-40 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Abrir Copiloto IA"
      >
        <Sparkles size={24} className="text-[#00a859]" />
      </button>

      {/* Janela de Chat */}
      {isOpen && (
        <div className="fixed bottom-0 md:bottom-6 right-0 md:right-6 w-full md:w-[380px] h-[80vh] md:h-[600px] bg-white md:rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 animate-in slide-in-from-bottom-5 md:slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-gray-900 text-white p-4 flex items-center justify-between md:rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-[#00a859]" />
              <span className="font-semibold">EcoTrack AI Copilot</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-[#00a859] text-white rounded-tr-sm" : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"}`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm prose-green prose-p:leading-snug max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-500 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-[#00a859]" />
                  <span className="text-xs">IA gerando resposta...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 md:rounded-b-2xl flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pergunte sobre seu impacto..."
              className="flex-1 bg-gray-100 border border-transparent focus:border-gray-300 focus:outline-none focus:ring-0 rounded-full px-4 py-3 text-sm transition-colors"
            />
            <Button size="icon" className="rounded-full h-11 w-11 flex-shrink-0" onClick={handleSend} disabled={!input.trim()}>
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
