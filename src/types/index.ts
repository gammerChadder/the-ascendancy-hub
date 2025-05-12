
// Common types for the productivity tracker

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed';
  tasks: Task[];
  resources: Resource[];
  progress: number; // 0-100
  createdAt: string;
}

export interface LearningItem {
  id: string;
  skill: string;
  resources: Resource[];
  progress: number; // 0-100
  notes?: string;
  createdAt: string;
}

export interface InternshipUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  completed?: boolean;
}

export interface ContentIdea {
  id: string;
  title: string;
  description?: string;
  platform?: string;
  status: 'idea' | 'draft' | 'published';
  createdAt: string;
}

export interface GymEntry {
  id: string;
  activity: string;
  duration?: number; // in minutes
  notes?: string;
  date: string;
}

export interface ScrumCard {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

// New type for meetings
export interface Meeting {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  attendees?: string[];
  preparation?: string[]; // Things to prepare before meeting
  notes?: string; // Meeting notes
  mom?: string; // Minutes of Meeting
  actionItems?: { 
    id: string;
    task: string;
    assignee?: string;
    dueDate?: string;
    completed: boolean;
  }[];
  createdAt: string;
}

export interface TrackerData {
  learning: LearningItem[];
  longTermPlans: Task[];
  dailyTasks: Task[];
  projects: Project[];
  internship: {
    updates: InternshipUpdate[];
    todos: Task[];
  };
  contentCreation: ContentIdea[];
  gymLife: GymEntry[];
  scrumBoard: ScrumCard[];
  meetings: Meeting[]; // New addition for meetings
}
