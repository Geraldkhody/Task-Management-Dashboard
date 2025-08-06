import type { TaskCardProps } from '../types'
import { Edit, Trash2 } from 'lucide-react'

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getStatusColor = (completed: boolean) => {
    return completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{task.todo}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
            aria-label="Edit task"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">User ID: {task.userId}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.completed)}`}>
            {task.completed ? 'Completed' : 'Incomplete'}
          </span>
        </div>
      </div>
    </div>
  )
}
