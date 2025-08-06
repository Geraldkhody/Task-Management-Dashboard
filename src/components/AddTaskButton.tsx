import { Plus } from 'lucide-react'
import type { AddTaskButtonProps } from '../types'

export function AddTaskButton({ 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  showText = true 
}: AddTaskButtonProps) {
  const baseClasses = "font-semibold transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 ring-1 ring-blue-500/20 hover:ring-blue-400/40",
    secondary: "bg-gradient-to-r from-red-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
  }
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2.5 rounded-xl",
    lg: "px-6 py-3 text-lg rounded-xl"
  }
  
  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label="Add new task"
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="relative">
          <Plus className={`${iconSizes[size]} transition-transform duration-300 group-hover:rotate-90`} />
        </div>
        {showText && (
          <span className="hidden sm:inline font-bold">
            Add Task
          </span>
        )}
      </div>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200 origin-center"></div>
      </div>
    </button>
  )
} 