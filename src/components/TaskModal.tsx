import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { TaskModalProps, TaskFormData, Task } from '../types'
import { X, AlertCircle } from 'lucide-react'

export function TaskModal({ isOpen, onClose, onSubmit, task, mode }: TaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<TaskFormData>({
    defaultValues: {
      todo: '',
      completed: false,
    }
  })

  useEffect(() => {
    if (isOpen) {
      if (task && mode === 'edit') {
        setValue('todo', (task as Task).todo);
        setValue('completed', (task as Task).completed);
      } else {
        reset({
          todo: '',
          completed: false,
        })
      }
    }
  }, [task, mode, isOpen, setValue, reset])

  const onFormSubmit = (data: TaskFormData) => {
    if (mode === 'edit' && task) {
      onSubmit({ ...task, ...data })
    } else {
      onSubmit({ ...data, userId: 1 }) // Assign a default userId for new tasks
    }
    onClose()
    reset()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === 'add' ? 'Add New Task' : 'Edit Task'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Todo Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Todo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('todo', {
                required: 'Todo is required',
                minLength: {
                  value: 3,
                  message: 'Todo must be at least 3 characters long'
                },
                validate: (value) => value.trim().length >= 3 || 'Todo must contain at least 3 non-whitespace characters'
              })}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
                errors.todo 
                  ? 'border-red-300 bg-red-50 focus:ring-red-500/20 focus:border-red-500' 
                  : 'border-gray-300 bg-gray-50 hover:bg-white'
              }`}
              placeholder="Enter a new todo (minimum 3 characters)"
            />
            {errors.todo && (
              <div className="mt-2 flex items-center gap-1 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{errors.todo.message}</span>
              </div>
            )}
          </div>
          
          {/* Completed Field */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('completed')}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Completed
            </label>
          </div>
          
          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 border border-transparent rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                isSubmitting 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </div>
              ) : (
                mode === 'add' ? 'Add Task' : 'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
