import type { Task } from '../types'

interface TaskFiltersProps {
  filterStatus: Task['status'] | 'All'
  onFilterChange: (status: Task['status'] | 'All') => void
  taskCount: number
}

export function TaskFilters({ filterStatus, onFilterChange, taskCount }: TaskFiltersProps) {
  return (
    <div className="mb-8">
      <div className=" items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Filter by status:</span>
            <select
              value={filterStatus}
              onChange={(e) => onFilterChange(e.target.value as Task['status'] | 'All')}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {taskCount} task{taskCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
} 