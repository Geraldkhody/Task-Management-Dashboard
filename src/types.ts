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