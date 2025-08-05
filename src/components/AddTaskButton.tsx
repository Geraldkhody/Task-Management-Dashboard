import { Plus } from 'lucide-react'

interface AddTaskButtonProps {
  onClick: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
}

export function AddTaskButton({ 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  showText = true 
}: AddTaskButtonProps) {
  const baseClasses = "font-semibold transition-all duration-200 flex items-center gap-2"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 hover:border-gray-400"
  }
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 rounded-lg",
    lg: "px-6 py-3 text-lg rounded-lg"
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
      <Plus className={iconSizes[size]} />
      {showText && (
        <span className="hidden sm:inline">
          Add Task
        </span>
      )}
    </button>
  )
} 