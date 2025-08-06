// Core Task Types
export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface NewTask {
  todo: string;
  completed: boolean;
  userId: number;
}

// Component Props Types
export interface TaskFiltersProps {
  filterStatus: 'All' | 'Completed' | 'Incomplete';
  taskCount: number;
  viewMode?: 'grid' | 'list';
  sortBy?: 'userId' | 'completed' | 'todo';
  onFilterChange: (status: 'All' | 'Completed' | 'Incomplete') => void;
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  onSortChange?: (sort: 'userId' | 'completed' | 'todo') => void;
}

export interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export interface TaskGridProps {
  tasks: Task[];
  filterStatus: 'All' | 'Completed' | 'Incomplete';
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onAddTask: () => void;
}

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: NewTask | Task) => void;
  task?: Task | null;
  mode: 'add' | 'edit';
}

export interface AddTaskButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export interface HeaderProps {
  onLogout?: () => void;
}

// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

// Authentication Types
export interface LoginProps {
  onSwitchToSignup: () => void;
}

export interface SignupProps {
  onSignup: (name: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
  loading?: boolean;
}

export interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Route Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export interface AuthRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

// Screen Types
export interface DashboardProps {
  onLogout?: () => void;
}

// Form Error Types
export interface LoginErrors {
  username?: string;
  password?: string;
}

export interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// Password Strength Types
export interface PasswordStrength {
  strength: number;
  color: string;
  text: string;
}

// Form Validation Types
export interface TaskFormData {
  todo: string;
  completed: boolean;
}

export interface TaskFormErrors {
  todo?: string;
}
