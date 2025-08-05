import type { Task } from '../types'
import { TaskCard } from './TaskCard'

interface TaskGridProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onAddTask: () => void
  filterStatus: Task['status'] | 'All'
}

export function TaskGrid({ tasks, onEdit, onDelete, onAddTask, filterStatus }: TaskGridProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
        <p className="mt-1 text-sm text-gray-500">
          {filterStatus === 'All' ? 'Get started by creating a new task.' : `No tasks with status "${filterStatus}".`}
        </p>
        {filterStatus === 'All' && (
          <div className="mt-6">
            <button
              onClick={onAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
            >
              Add Task
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
} 