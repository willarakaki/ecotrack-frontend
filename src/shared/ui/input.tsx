import * as React from "react"
import { cn } from "./button" // importando o utilitário cn

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  rightElement?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, rightElement, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-4 text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-14 w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a859] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
            icon && "pl-12", // Espaçamento extra se houver ícone na esquerda
            rightElement && "pr-12", // Espaçamento extra se houver elemento na direita
            className
          )}
          ref={ref}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4 text-gray-500">
            {rightElement}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"
