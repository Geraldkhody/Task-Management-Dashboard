import type { Task, TaskFiltersProps } from '../types'
import { Filter, Grid3X3, List, SortAsc } from 'lucide-react'



export function TaskFilters({ 
  filterStatus, 
  onFilterChange, 
  taskCount,
  sortBy = 'date',
  onSortChange
}: TaskFiltersProps) {
  const getStatusCount = (status: Task['status']) => {
    // This would be calculated from actual task data
    return Math.floor(Math.random() * 10) + 1
  }

  return (
    <div className="bg-white rounded-lg border text-sm border-gray-200 p-3 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left side - Filters and Count */}
        <div className="flex items-center gap-4">
          {/* Task Count */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {taskCount} task{taskCount !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1 text-xs">
            {(['All', 'To Do', 'In Progress', 'Done'] as const).map((status) => (
              <button
                key={status}
                onClick={() => onFilterChange(status)}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                  filterStatus === status
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {status}
                {status !== 'All' && (
                  <span className="ml-1 text-xs text-gray-400">
                    ({getStatusCount(status)})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right side - View Mode and Sort */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          {onSortChange && (
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as 'date' | 'priority' | 'status' | 'title')}
                className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                <option value="date">Date Created</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
                <option value="title">Title</option>
              </select>
              <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          )}

        </div>
      </div>

      {/* Mobile Filters */}
      <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600">Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value as Task['status'] | 'All')}
            className="flex-1 text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Tasks</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
    </div>
  )
} 