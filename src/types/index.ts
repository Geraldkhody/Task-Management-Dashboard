// Core Task Types
export interface Task {
  id: string
  title: string
  description: string
  status: 'To Do' | 'In Progress' | 'Done'
  priority: 'High' | 'Medium' | 'Low'
  createdAt: Date
}

export interface NewTask {
  title: string
  description: string
  status: Task['status']
  priority: Task['priority']
}

// Component Props Types
export interface TaskFiltersProps {
  filterStatus: Task['status'] | 'All'
  taskCount: number
  viewMode?: 'grid' | 'list'
  sortBy?: 'date' | 'priority' | 'status' | 'title'
  onFilterChange: (status: Task['status'] | 'All') => void
  onViewModeChange?: (mode: 'grid' | 'list') => void
  onSortChange?: (sort: 'date' | 'priority' | 'status' | 'title') => void
}

export interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export interface TaskGridProps {
  tasks: Task[]
  filterStatus: Task['status'] | 'All'
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onAddTask: () => void
}

export interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: NewTask | Task) => void
  task?: Task | null
  mode: 'add' | 'edit'
}

export interface AddTaskButtonProps {
  onClick: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
}

export interface HeaderProps {
  onLogout?: () => void
}

// Authentication Types
export interface LoginProps {
  onLogin: (email: string, password: string) => void
  onSwitchToSignup: () => void
  loading?: boolean
}

export interface SignupProps {
  onSignup: (name: string, email: string, password: string) => void
  onSwitchToLogin: () => void
  loading?: boolean
}

export interface UseAuthReturn {
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

// Route Types
export interface ProtectedRouteProps {
  children: React.ReactNode
  isAuthenticated: boolean
}

export interface AuthRouteProps {
  children: React.ReactNode
  isAuthenticated: boolean
}

export interface AppRoutesProps {
  isAuthenticated: boolean
  loading: boolean
  onLogin: (email: string, password: string) => Promise<void>
  onSignup: (name: string, email: string, password: string) => Promise<void>
  onLogout: () => void
}

// Screen Types
export interface DashboardProps {
  onLogout?: () => void
}

// Form Error Types
export interface LoginErrors {
  email?: string
  password?: string
}

export interface SignupErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

// Password Strength Types
export interface PasswordStrength {
  strength: number
  color: string
  text: string
}