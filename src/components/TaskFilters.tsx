import type { TaskFiltersProps } from '../types';
import { Filter, SortAsc } from 'lucide-react';

export function TaskFilters({ 
  filterStatus, 
  onFilterChange, 
  taskCount,
  sortBy = 'userId',
  onSortChange
}: TaskFiltersProps) {

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
            {(['All', 'Completed', 'Incomplete'] as const).map((status) => (
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
                onChange={(e) => onSortChange(e.target.value as 'userId' | 'completed' | 'todo')}
                className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                <option value="userId">User ID</option>
                <option value="completed">Status</option>
                <option value="todo">Title</option>
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
            onChange={(e) => onFilterChange(e.target.value as 'All' | 'Completed' | 'Incomplete')}
            className="flex-1 text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="All">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>
      </div>
    </div>
  )
}
