import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LearningItem, Resource, Task, Project, Internship, Content, GymLife, ScrumBoardItem } from "@/types";

interface TrackerContextType {
  data: {
    learning: LearningItem[];
    dailyTasks: Task[];
    longTermPlans: Task[];
    projects: Project[];
    internships: Internship[];
    content: Content[];
    gymLife: GymLife[];
    scrumBoard: ScrumBoardItem[];
  };
  addLearningItem: (item: Omit<LearningItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLearningItem: (id: string, updates: Partial<LearningItem>) => void;
  deleteLearningItem: (id: string) => void;
  addResource: (learningItemId: string, resource: Omit<Resource, 'id'>) => void;
  deleteResource: (learningItemId: string, resourceId: string) => void;
  addTask: (section: "dailyTasks" | "longTermPlans", task: Omit<Task, 'id'>) => void;
  updateTask: (section: "dailyTasks" | "longTermPlans", id: string, updates: Partial<Task>) => void;
  deleteTask: (section: "dailyTasks" | "longTermPlans", id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addInternship: (internship: Omit<Internship, 'id'>) => void;
  updateInternship: (id: string, updates: Partial<Internship>) => void;
  deleteInternship: (id: string) => void;
    addContent: (content: Omit<Content, 'id'>) => void;
  updateContent: (id: string, updates: Partial<Content>) => void;
  deleteContent: (id: string) => void;
  addGymLife: (gymLife: Omit<GymLife, 'id'>) => void;
  updateGymLife: (id: string, updates: Partial<GymLife>) => void;
  deleteGymLife: (id: string) => void;
  addScrumBoardItem: (item: Omit<ScrumBoardItem, 'id'>) => void;
  updateScrumBoardItem: (id: string, updates: Partial<ScrumBoardItem>) => void;
  deleteScrumBoardItem: (id: string) => void;
}

const initialData = {
  learning: [
    {
      id: uuidv4(),
      skill: "React",
      progress: 75,
      resources: [
        {
          id: uuidv4(),
          title: "React Official Documentation",
          url: "https://reactjs.org/docs/getting-started.html",
          description: "The official documentation for React.",
        },
      ],
      notes: [{ id: uuidv4(), content: "Practicing React Hooks" }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      skill: "TypeScript",
      progress: 30,
      resources: [
        {
          id: uuidv4(),
          title: "TypeScript Handbook",
          url: "https://www.typescriptlang.org/docs/handbook/intro.html",
          description: "Essential guide to TypeScript.",
        },
      ],
      notes: [{ id: uuidv4(), content: "Understanding Type Definitions" }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  dailyTasks: [
    {
      id: uuidv4(),
      title: "Code Review",
      description: "Review pull requests from team members",
      completed: false,
      dueDate: new Date().toISOString(),
    },
  ],
  longTermPlans: [
    {
      id: uuidv4(),
      title: "Learn Next.js",
      description: "Deep dive into Next.js framework",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    },
  ],
  projects: [],
  internships: [],
  content: [],
  gymLife: [],
  scrumBoard: [],
};

const TrackerContext = createContext<TrackerContextType>({
  data: initialData,
  addLearningItem: () => {},
  updateLearningItem: () => {},
  deleteLearningItem: () => {},
  addResource: () => {},
  deleteResource: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  addProject: () => {},
  updateProject: () => {},
  deleteProject: () => {},
  addInternship: () => {},
  updateInternship: () => {},
  deleteInternship: () => {},
  addContent: () => {},
  updateContent: () => {},
  deleteContent: () => {},
  addGymLife: () => {},
  updateGymLife: () => {},
  deleteGymLife: () => {},
  addScrumBoardItem: () => {},
  updateScrumBoardItem: () => {},
  deleteScrumBoardItem: () => {},
});

export const TrackerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(initialData);

  const addLearningItem = (item: Omit<LearningItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: LearningItem = {
      id: uuidv4(),
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setData(prev => ({ ...prev, learning: [...prev.learning, newItem] }));
  };

  const updateLearningItem = (id: string, updates: Partial<LearningItem>) => {
    setData(prev => ({
      ...prev,
      learning: prev.learning.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      )
    }));
  };

  const deleteLearningItem = (id: string) => {
    setData(prev => ({ ...prev, learning: prev.learning.filter(item => item.id !== id) }));
  };

  const addResource = (learningItemId: string, resource: Omit<Resource, 'id'>) => {
    const newResource: Resource = { id: uuidv4(), ...resource };
    setData(prev => ({
      ...prev,
      learning: prev.learning.map(item =>
        item.id === learningItemId
          ? { ...item, resources: [...item.resources, newResource] }
          : item
      ),
    }));
  };

  const deleteResource = (learningItemId: string, resourceId: string) => {
    setData(prev => ({
      ...prev,
      learning: prev.learning.map(item =>
        item.id === learningItemId
          ? { ...item, resources: item.resources.filter(r => r.id !== resourceId) }
          : item
      ),
    }));
  };

  const addTask = (section: "dailyTasks" | "longTermPlans", task: Omit<Task, 'id'>) => {
    const newTask: Task = { id: uuidv4(), ...task };
    setData(prev => ({ ...prev, [section]: [...prev[section], newTask] }));
  };

  const updateTask = (section: "dailyTasks" | "longTermPlans", id: string, updates: Partial<Task>) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(task =>
        task.id === id ? { ...task, ...updates } : task
      ),
    }));
  };

  const deleteTask = (section: "dailyTasks" | "longTermPlans", id: string) => {
    setData(prev => ({ ...prev, [section]: prev[section].filter(task => task.id !== id) }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = { id: uuidv4(), ...project };
    setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      ),
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(project => project.id !== id) }));
  };

  const addInternship = (internship: Omit<Internship, 'id'>) => {
    const newInternship: Internship = { id: uuidv4(), ...internship };
    setData(prev => ({ ...prev, internships: [...prev.internships, newInternship] }));
  };

  const updateInternship = (id: string, updates: Partial<Internship>) => {
    setData(prev => ({
      ...prev,
      internships: prev.internships.map(internship =>
        internship.id === id ? { ...internship, ...updates } : internship
      ),
    }));
  };

  const deleteInternship = (id: string) => {
    setData(prev => ({ ...prev, internships: prev.internships.filter(internship => internship.id !== id) }));
  };

    const addContent = (content: Omit<Content, 'id'>) => {
    const newContent: Content = { id: uuidv4(), ...content };
    setData(prev => ({ ...prev, content: [...prev.content, newContent] }));
  };

  const updateContent = (id: string, updates: Partial<Content>) => {
    setData(prev => ({
      ...prev,
      content: prev.content.map(content =>
        content.id === id ? { ...content, ...updates } : content
      ),
    }));
  };

  const deleteContent = (id: string) => {
    setData(prev => ({ ...prev, content: prev.content.filter(content => content.id !== id) }));
  };

    const addGymLife = (gymLife: Omit<GymLife, 'id'>) => {
    const newGymLife: GymLife = { id: uuidv4(), ...gymLife };
    setData(prev => ({ ...prev, gymLife: [...prev.gymLife, newGymLife] }));
  };

  const updateGymLife = (id: string, updates: Partial<GymLife>) => {
    setData(prev => ({
      ...prev,
      gymLife: prev.gymLife.map(gymLife =>
        gymLife.id === id ? { ...gymLife, ...updates } : gymLife
      ),
    }));
  };

  const deleteGymLife = (id: string) => {
    setData(prev => ({ ...prev, gymLife: prev.gymLife.filter(gymLife => gymLife.id !== id) }));
  };

  const addScrumBoardItem = (item: Omit<ScrumBoardItem, 'id'>) => {
    const newItem: ScrumBoardItem = { id: uuidv4(), ...item };
    setData(prev => ({ ...prev, scrumBoard: [...prev.scrumBoard, newItem] }));
  };

  const updateScrumBoardItem = (id: string, updates: Partial<ScrumBoardItem>) => {
    setData(prev => ({
      ...prev,
      scrumBoard: prev.scrumBoard.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const deleteScrumBoardItem = (id: string) => {
    setData(prev => ({ ...prev, scrumBoard: prev.scrumBoard.filter(item => item.id !== id) }));
  };

  return (
    <TrackerContext.Provider
      value={{
        data,
        addLearningItem,
        updateLearningItem,
        deleteLearningItem,
        addResource,
        deleteResource,
        addTask,
        updateTask,
        deleteTask,
        addProject,
        updateProject,
        deleteProject,
        addInternship,
        updateInternship,
        deleteInternship,
        addContent,
        updateContent,
        deleteContent,
        addGymLife,
        updateGymLife,
        deleteGymLife,
        addScrumBoardItem,
        updateScrumBoardItem,
        deleteScrumBoardItem,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => useContext(TrackerContext);
