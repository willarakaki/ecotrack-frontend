"use client"
import React, { useState } from "react"
import { AnimatedNumber } from "@/shared/ui/animated-number"
import { useEcoStore } from "@/shared/store/use-eco-store"
import { Leaf, Award, Heart, Target, Plus, Zap, BookOpen, ChevronRight } from "lucide-react"
import { Button } from "@/shared/ui/button"

export default function DashboardPage() {
  const { ecoPoints, individualCarbonSaved, companyCarbonSaved, feed, toggleLikeFeedItem, activeGoal, sendPeerPraise, dailyQuizCompleted, completeDailyQuiz } = useEcoStore()
  const [isPraiseModalOpen, setIsPraiseModalOpen] = useState(false)
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)
  
  const [receiver, setReceiver] = useState("")
  const [pointsToSend, setPointsToSend] = useState(10)
  const [message, setMessage] = useState("")
  const [tag, setTag] = useState("#Inovação")

  const handleSendPraise = () => {
    if (!receiver || !message) return
    const success = sendPeerPraise(receiver, pointsToSend, message, tag)
    if (success) {
      setIsPraiseModalOpen(false)
      setReceiver("")
      setMessage("")
    } else {
      alert("Saldo de pontos insuficiente.")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-2xl mx-auto pb-24 relative">
      
      {/* Saudação e Saldo */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Boa tarde, João!</h1>
        <p className="text-sm text-gray-500">A energia da equipe está em alta hoje.</p>
      </div>

      <div className="bg-[#00a859] rounded-2xl p-6 text-white shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-green-100">Seu Saldo</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold"><AnimatedNumber value={ecoPoints} /></span>
              <span className="text-sm font-medium">pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Impacto Carbono */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Leaf size={16} />
            <span className="text-xs font-semibold uppercase">Seu Impacto</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900"><AnimatedNumber value={individualCarbonSaved} /></span>
            <span className="text-sm font-medium text-gray-500">kg CO₂</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-1">
          <div className="flex items-center gap-2 text-gray-500 mb-1">
            <Target size={16} />
            <span className="text-xs font-semibold uppercase">Time Impacto</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900"><AnimatedNumber value={companyCarbonSaved} /></span>
            <span className="text-sm font-medium text-gray-500">ton CO₂</span>
          </div>
        </div>
      </div>

      {/* Campanhas e Desafios */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-sm flex flex-col gap-2 relative overflow-hidden">
        <Zap size={80} className="absolute -right-4 -top-4 opacity-10 text-white" />
        <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-md w-fit uppercase tracking-wider">Desafio da Semana</span>
        <h3 className="font-bold text-lg mt-1">Semana Sem Papel 🌳</h3>
        <p className="text-blue-100 text-sm">Não imprima nada até sexta-feira e ganhe +50 pts bônus de equipe!</p>
      </div>

      {/* Micro-aprendizagem (Quiz) */}
      {!dailyQuizCompleted && (
        <button 
          onClick={() => setIsQuizModalOpen(true)}
          className="bg-white border-2 border-orange-200 hover:border-orange-300 rounded-2xl p-4 shadow-sm flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Quiz Diário Disponível</h4>
              <p className="text-gray-500 text-xs">Responda para ganhar +5 EcoPoints fáceis!</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      )}

      {/* Progresso do Objetivo de Mercado (Marketplace Goal) */}
      {activeGoal && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-gray-900 font-semibold">
              <Target size={18} className="text-[#00a859]" />
              Sua Meta: {activeGoal.name}
            </div>
            <span className="text-sm text-gray-500">{ecoPoints} / {activeGoal.cost}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div 
              className="bg-[#00a859] h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((ecoPoints / activeGoal.cost) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">
            {ecoPoints >= activeGoal.cost 
              ? "Meta alcançada! Vá ao Marketplace resgatar." 
              : `Faltam ${activeGoal.cost - ecoPoints} pts.`}
          </p>
        </div>
      )}

      {/* Feed Social de Reconhecimento */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award size={20} className="text-[#00a859]" /> Mural da Equipe
        </h2>
        
        <div className="flex flex-col gap-4">
          {feed.map(item => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm border border-gray-200">
                  {item.author.charAt(0)}
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-bold text-gray-900">{item.author}</span>
                    {item.receiver && (
                      <>
                        <span className="text-gray-500">elogiou</span>
                        <span className="font-bold text-[#00a859]">{item.receiver}</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
              
              <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                <span className="inline-block bg-green-50 text-[#00a859] text-xs font-semibold px-2 py-1 rounded-md">
                  {item.tag}
                </span>
                <button 
                  onClick={() => toggleLikeFeedItem(item.id)}
                  className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors text-sm font-medium"
                >
                  <Heart size={16} className={item.isLikedByMe ? "fill-red-500 text-red-500" : ""} />
                  {item.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB (Floating Action Button) para Elogio (P2P) */}
      <button
        onClick={() => setIsPraiseModalOpen(true)}
        className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-full p-4 shadow-2xl hover:scale-105 transition-transform z-40 flex items-center gap-2 font-bold px-6 border-4 border-gray-50"
      >
        <Plus size={20} className="text-[#00a859]" /> Reconhecer
      </button>

      {/* Modal de Elogio */}
      {isPraiseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full md:w-96 md:rounded-3xl rounded-t-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enviar Reconhecimento</h3>
            
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Para quem?</label>
              <input 
                type="text" 
                placeholder="Ex: Maria" 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mt-1 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#00a859]"
                value={receiver}
                onChange={e => setReceiver(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase flex justify-between">
                <span>Quantos pontos? (Tira do seu saldo)</span>
                <span className="text-[#00a859] font-bold">{pointsToSend} pts</span>
              </label>
              <input 
                type="range" 
                min="5" max="50" step="5"
                value={pointsToSend}
                onChange={e => setPointsToSend(Number(e.target.value))}
                className="w-full mt-2 accent-[#00a859]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Valor Corporativo</label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {["#Inovação", "#TrabalhoEmEquipe", "#Excelência"].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTag(t)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${tag === t ? 'bg-[#00a859] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Mensagem</label>
              <textarea 
                placeholder="Obrigado por salvar aquele projeto..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 mt-1 text-sm text-gray-900 font-medium resize-none focus:outline-none focus:border-[#00a859] h-20"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mt-2">
              <Button variant="outline" className="flex-1 text-gray-700" onClick={() => setIsPraiseModalOpen(false)}>Cancelar</Button>
              <Button className="flex-1 bg-[#00a859] hover:bg-[#00904a] text-white" onClick={handleSendPraise}>Enviar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Quiz */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Quiz Rápido 🧠</h3>
              <span className="bg-orange-100 text-orange-600 font-bold px-2 py-1 rounded text-xs">+5 pts</span>
            </div>
            
            <div>
              <p className="text-gray-700 font-medium text-lg leading-snug">Qual setor é responsável por cerca de 30% das emissões globais de gases de efeito estufa?</p>
              <div className="flex flex-col gap-3 mt-6">
                <Button variant="outline" className="justify-start text-left h-auto py-3 px-4 font-normal text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors" onClick={() => alert("Ops! Tente novamente amanhã.")}>A) Indústria Têxtil</Button>
                <Button variant="outline" className="justify-start text-left h-auto py-3 px-4 font-normal text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-300 transition-colors" onClick={() => {
                  completeDailyQuiz(5)
                  setIsQuizModalOpen(false)
                }}>B) Produção de Energia (Eletricidade e Calor)</Button>
                <Button variant="outline" className="justify-start text-left h-auto py-3 px-4 font-normal text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors" onClick={() => alert("Ops! Tente novamente amanhã.")}>C) Transporte Aéreo</Button>
              </div>
            </div>

            <Button variant="ghost" className="text-gray-400 mt-2" onClick={() => setIsQuizModalOpen(false)}>Pular por enquanto</Button>
          </div>
        </div>
      )}
    </div>
  )
}
