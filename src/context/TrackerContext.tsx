import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { 
  LearningItem, 
  Resource, 
  Task, 
  Project, 
  ProjectTask,
  Internship, 
  InternshipTask,
  InternshipUpdate,
  Content, 
  GymLife, 
  ScrumCard,
  ContentIdea,
  TrackerData
} from "@/types";

interface TrackerContextType {
  data: TrackerData;
  addLearningItem: (item: Omit<LearningItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLearningItem: (id: string, updates: Partial<LearningItem>) => void;
  deleteLearningItem: (id: string) => void;
  addResource: (learningItemId: string, resource: Omit<Resource, 'id'>) => void;
  deleteResource: (learningItemId: string, resourceId: string) => void;
  addTask: (section: "dailyTasks" | "longTermPlans", task: Omit<Task, 'id'>) => void;
  updateTask: (section: "dailyTasks" | "longTermPlans", id: string, updates: Partial<Task>) => void;
  deleteTask: (section: "dailyTasks" | "longTermPlans", id: string) => void;
  addProject: (project: Omit<Project, 'id' | 'tasks' | 'resources'>) => void;
  updateProject: (id: string, updates: Partial<Omit<Project, 'tasks' | 'resources'>>) => void;
  deleteProject: (id: string) => void;
  addProjectTask: (projectId: string, task: Omit<ProjectTask, 'id'>) => void;
  updateProjectTask: (projectId: string, taskId: string, updates: Partial<ProjectTask>) => void;
  deleteProjectTask: (projectId: string, taskId: string) => void;
  addProjectResource: (projectId: string, resource: Omit<Resource, 'id'>) => void;
  deleteProjectResource: (projectId: string, resourceId: string) => void;
  addInternship: (internship: Omit<Internship, 'id'>) => void;
  updateInternship: (id: string, updates: Partial<Internship>) => void;
  deleteInternship: (id: string) => void;
  addInternshipTask: (task: Omit<InternshipTask, 'id'>) => void;
  updateInternshipTask: (id: string, updates: Partial<InternshipTask>) => void;
  deleteInternshipTask: (id: string) => void;
  addInternshipUpdate: (update: Omit<InternshipUpdate, 'id'>) => void;
  updateInternshipUpdate: (id: string, updates: Partial<InternshipUpdate>) => void;
  deleteInternshipUpdate: (id: string) => void;
  addContent: (content: Omit<Content, 'id'>) => void;
  updateContent: (id: string, updates: Partial<Content>) => void;
  deleteContent: (id: string) => void;
  addContentIdea: (idea: Omit<ContentIdea, 'id'>) => void;
  updateContentIdea: (id: string, updates: Partial<ContentIdea>) => void;
  deleteContentIdea: (id: string) => void;
  addGymEntry: (entry: Omit<GymLife, 'id' | 'workout' | 'type' | 'createdAt' | 'updatedAt'>) => void;
  updateGymLife: (id: string, updates: Partial<GymLife>) => void;
  deleteGymEntry: (id: string) => void;
  addScrumCard: (card: Omit<ScrumCard, 'id' | 'createdAt'>) => void;
  updateScrumCardStatus: (id: string, status: 'todo' | 'inProgress' | 'done') => void;
  deleteScrumCard: (id: string) => void;
}

const initialData: TrackerData = {
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
  contentCreation: [],
  gymLife: [],
  scrumBoard: [],
  internship: {
    todos: [],
    updates: []
  }
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
  addProjectTask: () => {},
  updateProjectTask: () => {},
  deleteProjectTask: () => {},
  addProjectResource: () => {},
  deleteProjectResource: () => {},
  addInternship: () => {},
  updateInternship: () => {},
  deleteInternship: () => {},
  addInternshipTask: () => {},
  updateInternshipTask: () => {},
  deleteInternshipTask: () => {},
  addInternshipUpdate: () => {},
  updateInternshipUpdate: () => {},
  deleteInternshipUpdate: () => {},
  addContent: () => {},
  updateContent: () => {},
  deleteContent: () => {},
  addContentIdea: () => {},
  updateContentIdea: () => {},
  deleteContentIdea: () => {},
  addGymEntry: () => {},
  updateGymLife: () => {},
  deleteGymEntry: () => {},
  addScrumCard: () => {},
  updateScrumCardStatus: () => {},
  deleteScrumCard: () => {},
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

  const addProject = (project: Omit<Project, 'id' | 'tasks' | 'resources'>) => {
    const newProject: Project = { 
      id: uuidv4(), 
      ...project,
      tasks: [],
      resources: [],
      progress: project.progress || 0
    };
    setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const updateProject = (id: string, updates: Partial<Omit<Project, 'tasks' | 'resources'>>) => {
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

  const addProjectTask = (projectId: string, task: Omit<ProjectTask, 'id'>) => {
    const newTask: ProjectTask = { id: uuidv4(), ...task };
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, newTask] }
          : project
      ),
    }));
  };

  const updateProjectTask = (projectId: string, taskId: string, updates: Partial<ProjectTask>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map(task =>
                task.id === taskId ? { ...task, ...updates } : task
              ),
            }
          : project
      ),
    }));
  };

  const deleteProjectTask = (projectId: string, taskId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId
          ? { ...project, tasks: project.tasks.filter(task => task.id !== taskId) }
          : project
      ),
    }));
  };

  const addProjectResource = (projectId: string, resource: Omit<Resource, 'id'>) => {
    const newResource: Resource = { id: uuidv4(), ...resource };
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId
          ? { ...project, resources: [...project.resources, newResource] }
          : project
      ),
    }));
  };

  const deleteProjectResource = (projectId: string, resourceId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId
          ? { ...project, resources: project.resources.filter(r => r.id !== resourceId) }
          : project
      ),
    }));
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

  const addInternshipTask = (task: Omit<InternshipTask, 'id'>) => {
    const newTask: InternshipTask = { id: uuidv4(), ...task };
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        todos: [...prev.internship.todos, newTask]
      }
    }));
  };

  const updateInternshipTask = (id: string, updates: Partial<InternshipTask>) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        todos: prev.internship.todos.map(task =>
          task.id === id ? { ...task, ...updates } : task
        )
      }
    }));
  };

  const deleteInternshipTask = (id: string) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        todos: prev.internship.todos.filter(task => task.id !== id)
      }
    }));
  };

  const addInternshipUpdate = (update: Omit<InternshipUpdate, 'id'>) => {
    const newUpdate: InternshipUpdate = { id: uuidv4(), ...update };
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        updates: [...prev.internship.updates, newUpdate]
      }
    }));
  };

  const updateInternshipUpdate = (id: string, updates: Partial<InternshipUpdate>) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        updates: prev.internship.updates.map(update =>
          update.id === id ? { ...update, ...updates } : update
        )
      }
    }));
  };

  const deleteInternshipUpdate = (id: string) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        updates: prev.internship.updates.filter(update => update.id !== id)
      }
    }));
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

  const addContentIdea = (idea: Omit<ContentIdea, 'id'>) => {
    const newIdea: ContentIdea = { id: uuidv4(), ...idea };
    setData(prev => ({ ...prev, contentCreation: [...prev.contentCreation, newIdea] }));
  };

  const updateContentIdea = (id: string, updates: Partial<ContentIdea>) => {
    setData(prev => ({
      ...prev,
      contentCreation: prev.contentCreation.map(idea =>
        idea.id === id ? { ...idea, ...updates } : idea
      ),
    }));
  };

  const deleteContentIdea = (id: string) => {
    setData(prev => ({ ...prev, contentCreation: prev.contentCreation.filter(idea => idea.id !== id) }));
  };

  const addGymEntry = (entry: Omit<GymLife, 'id' | 'workout' | 'type' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: GymLife = { 
      id: uuidv4(),
      workout: entry.activity,
      type: 'other',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...entry
    };
    setData(prev => ({ ...prev, gymLife: [...prev.gymLife, newEntry] }));
  };

  const updateGymLife = (id: string, updates: Partial<GymLife>) => {
    setData(prev => ({
      ...prev,
      gymLife: prev.gymLife.map(entry =>
        entry.id === id ? { ...entry, ...updates, updatedAt: new Date().toISOString() } : entry
      ),
    }));
  };

  const deleteGymEntry = (id: string) => {
    setData(prev => ({ ...prev, gymLife: prev.gymLife.filter(entry => entry.id !== id) }));
  };

  const addScrumCard = (card: Omit<ScrumCard, 'id' | 'createdAt'>) => {
    const newCard: ScrumCard = { 
      id: uuidv4(),
      createdAt: new Date().toISOString(), // Ensure this is set
      ...card
    };
    setData(prev => ({ ...prev, scrumBoard: [...prev.scrumBoard, newCard] }));
  };

  const updateScrumCardStatus = (id: string, status: 'todo' | 'inProgress' | 'done') => {
    setData(prev => ({
      ...prev,
      scrumBoard: prev.scrumBoard.map(card =>
        card.id === id ? { ...card, status } : card
      ),
    }));
  };

  const deleteScrumCard = (id: string) => {
    setData(prev => ({ ...prev, scrumBoard: prev.scrumBoard.filter(card => card.id !== id) }));
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
        addProjectTask,
        updateProjectTask,
        deleteProjectTask,
        addProjectResource,
        deleteProjectResource,
        addInternship,
        updateInternship,
        deleteInternship,
        addInternshipTask,
        updateInternshipTask,
        deleteInternshipTask,
        addInternshipUpdate,
        updateInternshipUpdate,
        deleteInternshipUpdate,
        addContent,
        updateContent,
        deleteContent,
        addContentIdea,
        updateContentIdea,
        deleteContentIdea,
        addGymEntry,
        updateGymLife,
        deleteGymEntry,
        addScrumCard,
        updateScrumCardStatus,
        deleteScrumCard
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => useContext(TrackerContext);
