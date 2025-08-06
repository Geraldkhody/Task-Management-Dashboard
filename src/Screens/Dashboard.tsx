import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import type { Task, NewTask, DashboardProps } from '../types';
import { Header, TaskFilters, TaskGrid, TaskModal, AddTaskButton } from '../components';
import { useTasks } from '../hooks/useTasks';
import { addNewTask, updateExistingTask, deleteExistingTask } from '../store/taskSlice';
import type { AppDispatch } from '../store/store';

export function Dashboard({ onLogout }: DashboardProps) {
  const { tasks, loading, error } = useTasks();
  const dispatch = useDispatch<AppDispatch>();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Completed' | 'Incomplete'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<'userId' | 'completed' | 'todo'>('userId');

  const filteredTasks = useMemo(() => {
    if (filterStatus === 'All') {
      return tasks;
    }
    const isCompleted = filterStatus === 'Completed';
    return tasks.filter((task) => task.completed === isCompleted);
  }, [tasks, filterStatus]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === 'userId') {
        return a.userId - b.userId;
      }
      if (sortBy === 'completed') {
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      }
      if (sortBy === 'todo') {
        return a.todo.localeCompare(b.todo);
      }
      return 0;
    });
  }, [filteredTasks, sortBy]);

  const handleAddTask = (newTask: NewTask) => {
    dispatch(addNewTask(newTask));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    dispatch(updateExistingTask(updatedTask));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteExistingTask(id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleModalSubmit = (task: NewTask | Task) => {
    if ('id' in task) {
      handleUpdateTask(task);
    } else {
      handleAddTask(task);
    }
  };

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

        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <TaskGrid
            tasks={sortedTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onAddTask={() => setShowAddModal(true)}
            filterStatus={filterStatus}
          />
        )}
      </main>

      <TaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleModalSubmit}
        mode="add"
      />

      <TaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleModalSubmit}
        task={editingTask}
        mode="edit"
      />
    </div>
  );
}
