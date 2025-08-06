import { useState } from 'react'
import type { Task, NewTask, DashboardProps } from '../types'
import { Header, TaskFilters, TaskGrid, TaskModal, AddTaskButton } from '../components'

export function Dashboard({ onLogout }: DashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new feature',
      status: 'In Progress',
      priority: 'High',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Review code changes',
      description: 'Review pull requests and provide feedback',
      status: 'To Do',
      priority: 'Medium',
      createdAt: new Date('2024-01-16')
    },
    {
      id: '3',
      title: 'Setup development environment',
      description: 'Install and configure all necessary tools',
      status: 'Done',
      priority: 'Low',
      createdAt: new Date('2024-01-14')
    }
  ])

  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'All'>('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status' | 'title'>('date')

  const filteredTasks = filterStatus === 'All' 
    ? tasks 
    : tasks.filter(task => task.status === filterStatus)

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    if (sortBy === 'priority') {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleAddTask = (newTask: NewTask) => {
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      createdAt: new Date()
    }
    setTasks([...tasks, task])
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleModalSubmit = (task: NewTask | Task) => {
    if ('id' in task) {
      // Editing existing task
      handleUpdateTask(task)
    } else {
      // Adding new task
      handleAddTask(task)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <TaskFilters
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            taskCount={filteredTasks.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <AddTaskButton onClick={() => setShowAddModal(true)} />
        </div>
        
        <TaskGrid
          tasks={sortedTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onAddTask={() => setShowAddModal(true)}
          filterStatus={filterStatus}
        />
      </main>

      {/* Add Task Modal */}
      <TaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleModalSubmit}
        mode="add"
      />

      {/* Edit Task Modal */}
      <TaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleModalSubmit}
        task={editingTask}
        mode="edit"
      />
    </div>
  )
} 