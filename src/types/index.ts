
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
  progress: number;
  tasks: ProjectTask[];
  resources: Resource[];
}

export interface ProjectTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
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

export interface InternshipTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface InternshipUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  completed: boolean;
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

export interface ContentIdea {
  id: string;
  title: string;
  description?: string;
  platform?: string;
  status: 'idea' | 'draft' | 'published';
}

export interface GymLife {
  id: string;
  workout: string;
  type: 'strength' | 'cardio' | 'yoga' | 'other';
  duration?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  activity: string;
  date: string;
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

export interface ScrumCard {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
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
  contentCreation: ContentIdea[];
  gymLife: GymLife[];
  scrumBoard: ScrumCard[];
  internship: {
    todos: InternshipTask[];
    updates: InternshipUpdate[];
  };
}
