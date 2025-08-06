import type { TaskGridProps } from '../types'
import { TaskCard } from './TaskCard'
import { AddTaskButton } from './AddTaskButton'
import { ClipboardList } from 'lucide-react'



export function TaskGrid({ tasks, onEdit, onDelete, onAddTask, filterStatus }: TaskGridProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
        <p className="mt-1 text-sm text-gray-500">
          {filterStatus === 'All' ? 'Get started by creating a new task.' : `No tasks with status "${filterStatus}".`}
        </p>
        {filterStatus === 'All' && (
          <div className="mt-6">
            <AddTaskButton onClick={onAddTask} variant="secondary" />
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