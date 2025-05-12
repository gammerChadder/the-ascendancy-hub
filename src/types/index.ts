export interface Resource {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'planned' | 'inProgress' | 'completed' | 'onHold';
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Content {
  id: string;
  title: string;
  type: 'blog' | 'video' | 'podcast' | 'other';
  url?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GymLife {
  id: string;
  workout: string;
  type: 'strength' | 'cardio' | 'yoga' | 'other';
  duration?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScrumTask {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'inProgress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
}

export interface Note {
  id: string;
  content: string;
}

export interface LearningItem {
  id: string;
  skill: string;
  progress: number;
  resources: Resource[];
  notes: Note[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TrackerData {
  learning: LearningItem[];
  dailyTasks: Task[];
  longTermPlans: Task[];
  projects: Project[];
  internships: Internship[];
  content: Content[];
  gymLife: GymLife[];
  scrumBoard: ScrumTask[];
}
