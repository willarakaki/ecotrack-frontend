"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff, Building, ShieldCheck } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mocking do loading state
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/home")
    }, 1500)
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center px-4">
      {/* Logo e Cabeçalho */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="mb-4">
          <Image src="/logo.png" alt="EcoTrack AI Logo" width={100} height={100} priority className="object-contain" unoptimized />
        </div>
        <p className="text-gray-600 mt-2 text-sm max-w-[280px]">
          Inteligência que transforma ações em impacto positivo.
        </p>
      </div>

      {/* Formulário Principal */}
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <Input 
          type="email" 
          placeholder="E-mail Corporativo" 
          icon={<Mail size={20} />}
          required
        />
        
        <Input 
          type={showPassword ? "text" : "password"} 
          placeholder="Senha" 
          icon={<Lock size={20} />}
          rightElement={
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-gray-700 transition-colors focus:outline-none"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
          required
        />

        <div className="flex justify-end w-full">
          <a href="#" className="text-sm text-gray-600 hover:text-[#00a859] underline-offset-4 hover:underline transition-colors">
            Esqueci minha senha
          </a>
        </div>

        <Button 
          type="submit" 
          className="w-full mt-2" 
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Validando..." : "Entrar"}
        </Button>
      </form>

      {/* Divisor */}
      <div className="relative flex py-8 items-center w-full">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink-0 mx-4 text-gray-500 text-xs">ou acesse com</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Botão SSO */}
      <Button variant="outline" size="lg" className="w-full bg-gray-50 hover:bg-gray-100 border-gray-300">
        <Building className="mr-2 text-gray-500" size={20} />
        Entrar com o e-mail da Empresa (SSO)
      </Button>

      {/* Footer Segurança */}
      <div className="mt-8 flex items-center text-xs text-gray-500 max-w-[250px] text-center gap-2">
        <ShieldCheck size={24} className="text-gray-400 flex-shrink-0" />
        <p>Seus dados estão protegidos com criptografia de ponta a ponta.</p>
      </div>

      <button 
        type="button"
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => router.push("/admin/dashboard"), 1000);
        }}
        className="mt-6 text-xs text-gray-400 hover:text-gray-600 transition-colors underline-offset-4 hover:underline"
      >
        Acesso Restrito: Diretoria ESG / Admin
      </button>
    </div>
  )
}
