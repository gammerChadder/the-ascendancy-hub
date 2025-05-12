import React, { createContext, useContext, useState, useEffect } from "react";
import { TrackerData, Task, Resource, Project, LearningItem, InternshipUpdate, ContentIdea, GymEntry, ScrumCard, Meeting } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

// Initial sample data
const initialData: TrackerData = {
  learning: [
    {
      id: uuidv4(),
      skill: "React",
      resources: [
        {
          id: uuidv4(),
          title: "React Documentation",
          url: "https://reactjs.org/docs/getting-started.html",
          description: "Official React documentation",
          createdAt: new Date().toISOString(),
        }
      ],
      progress: 65,
      notes: "Working through advanced hooks",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      skill: "TypeScript",
      resources: [
        {
          id: uuidv4(),
          title: "TypeScript Handbook",
          url: "https://www.typescriptlang.org/docs/handbook/intro.html",
          description: "Official TypeScript documentation",
          createdAt: new Date().toISOString(),
        }
      ],
      progress: 40,
      notes: "Learning generics and utility types",
      createdAt: new Date().toISOString(),
    }
  ],
  longTermPlans: [
    {
      id: uuidv4(),
      title: "Become a full-stack developer",
      description: "Master both frontend and backend technologies",
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString(),
    },
    {
      id: uuidv4(),
      title: "Build a SaaS product",
      description: "Create and launch a SaaS application",
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    }
  ],
  dailyTasks: [
    {
      id: uuidv4(),
      title: "Code review PR #123",
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: "Study React hooks for 1 hour",
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date().toISOString(),
    }
  ],
  projects: [
    {
      id: uuidv4(),
      title: "Personal Portfolio Website",
      description: "Creating a portfolio website to showcase my work",
      status: "in-progress",
      tasks: [
        {
          id: uuidv4(),
          title: "Design homepage",
          completed: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          title: "Implement responsive layout",
          completed: false,
          createdAt: new Date().toISOString(),
        }
      ],
      resources: [
        {
          id: uuidv4(),
          title: "Design inspiration",
          url: "https://dribbble.com",
          createdAt: new Date().toISOString(),
        }
      ],
      progress: 60,
      createdAt: new Date().toISOString(),
    }
  ],
  internship: {
    updates: [
      {
        id: uuidv4(),
        title: "Completed onboarding",
        description: "Finished the onboarding process and set up development environment",
        date: new Date().toISOString(),
        tags: ["onboarding", "setup"],
      }
    ],
    todos: [
      {
        id: uuidv4(),
        title: "Fix bug in login page",
        completed: false,
        createdAt: new Date().toISOString(),
      }
    ]
  },
  contentCreation: [
    {
      id: uuidv4(),
      title: "How to Use React Hooks",
      description: "Tutorial on using React hooks effectively",
      platform: "Blog",
      status: "idea",
      createdAt: new Date().toISOString(),
    }
  ],
  gymLife: [
    {
      id: uuidv4(),
      activity: "Weightlifting",
      duration: 60,
      notes: "Focused on upper body",
      date: new Date().toISOString(),
    }
  ],
  scrumBoard: [
    {
      id: uuidv4(),
      title: "Create homepage UI",
      description: "Design and implement the homepage UI according to the wireframes",
      status: "todo",
      priority: "high",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: "Implement auth flow",
      description: "Add login and registration functionality",
      status: "inProgress",
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: "Setup CI/CD pipeline",
      description: "Configure GitHub Actions for automated testing and deployment",
      status: "done",
      priority: "low",
      createdAt: new Date().toISOString(),
    }
  ],
  meetings: [
    {
      id: uuidv4(),
      title: "Weekly Team Sync",
      description: "Regular team meeting to discuss progress and roadblocks",
      date: new Date().toISOString(),
      startTime: "09:00",
      endTime: "10:00",
      attendees: ["John Doe", "Jane Smith", "Robert Johnson"],
      preparation: ["Prepare status update", "Review sprint backlog"],
      notes: "",
      mom: "",
      actionItems: [
        {
          id: uuidv4(),
          task: "Update project documentation",
          assignee: "Jane Smith",
          dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
          completed: false,
        }
      ],
      createdAt: new Date().toISOString(),
    }
  ]
};

interface TrackerContextType {
  data: TrackerData;
  addTask: (section: keyof Pick<TrackerData, "longTermPlans" | "dailyTasks">, task: Omit<Task, "id" | "createdAt">) => void;
  addInternshipTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (section: keyof Pick<TrackerData, "longTermPlans" | "dailyTasks">, taskId: string, updates: Partial<Task>) => void;
  updateInternshipTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (section: keyof Pick<TrackerData, "longTermPlans" | "dailyTasks">, taskId: string) => void;
  deleteInternshipTask: (taskId: string) => void;
  addLearningItem: (item: Omit<LearningItem, "id" | "createdAt">) => void;
  updateLearningItem: (itemId: string, updates: Partial<LearningItem>) => void;
  deleteLearningItem: (itemId: string) => void;
  addResource: (learningItemId: string, resource: Omit<Resource, "id" | "createdAt">) => void;
  deleteResource: (learningItemId: string, resourceId: string) => void;
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  addProjectTask: (projectId: string, task: Omit<Task, "id" | "createdAt">) => void;
  updateProjectTask: (projectId: string, taskId: string, updates: Partial<Task>) => void;
  deleteProjectTask: (projectId: string, taskId: string) => void;
  addProjectResource: (projectId: string, resource: Omit<Resource, "id" | "createdAt">) => void;
  deleteProjectResource: (projectId: string, resourceId: string) => void;
  addInternshipUpdate: (update: Omit<InternshipUpdate, "id">) => void;
  updateInternshipUpdate: (updateId: string, updates: Partial<InternshipUpdate>) => void;
  deleteInternshipUpdate: (updateId: string) => void;
  addContentIdea: (idea: Omit<ContentIdea, "id" | "createdAt">) => void;
  updateContentIdea: (ideaId: string, updates: Partial<ContentIdea>) => void;
  deleteContentIdea: (ideaId: string) => void;
  addGymEntry: (entry: Omit<GymEntry, "id">) => void;
  deleteGymEntry: (entryId: string) => void;
  // Scrum Board methods
  addScrumCard: (card: Omit<ScrumCard, "id" | "createdAt">) => void;
  updateScrumCardStatus: (cardId: string, status: ScrumCard["status"]) => void;
  updateScrumCard: (cardId: string, updates: Partial<ScrumCard>) => void;
  deleteScrumCard: (cardId: string) => void;
  // Meeting methods
  addMeeting: (meeting: Omit<Meeting, "id" | "createdAt">) => void;
  updateMeeting: (meetingId: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (meetingId: string) => void;
  addMeetingActionItem: (meetingId: string, actionItem: Omit<Meeting["actionItems"][0], "id">) => void;
  updateMeetingActionItem: (meetingId: string, actionItemId: string, updates: Partial<Omit<Meeting["actionItems"][0], "id">>) => void;
  deleteMeetingActionItem: (meetingId: string, actionItemId: string) => void;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export const TrackerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<TrackerData>(() => {
    const savedData = localStorage.getItem("trackerData");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("trackerData", JSON.stringify(data));
  }, [data]);

  // Tasks functions (longTermPlans and dailyTasks)
  const addTask = (section: keyof Pick<TrackerData, "longTermPlans" | "dailyTasks">, task: Omit<Task, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      [section]: [
        ...prev[section],
        {
          ...task,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        }
      ]
    }));
    toast.success(`Task added to ${section === "longTermPlans" ? "Long Term Plans" : "Daily Tasks"}`);
  };

  const updateTask = (section: keyof Pick<TrackerData, "longTermPlans" | "dailyTasks">, taskId: string, updates: Partial<Task>) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
    toast.success("Task updated");
  };

  const deleteTask = (section: keyof Pick<TrackerData, "longTermPlans" | "dailyTasks">, taskId: string) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter(task => task.id !== taskId)
    }));
    toast.success("Task deleted");
  };

  // Internship tasks
  const addInternshipTask = (task: Omit<Task, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        todos: [
          ...prev.internship.todos,
          {
            ...task,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
          }
        ]
      }
    }));
    toast.success("Internship task added");
  };

  const updateInternshipTask = (taskId: string, updates: Partial<Task>) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        todos: prev.internship.todos.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      }
    }));
    toast.success("Internship task updated");
  };

  const deleteInternshipTask = (taskId: string) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        todos: prev.internship.todos.filter(task => task.id !== taskId)
      }
    }));
    toast.success("Internship task deleted");
  };

  // Learning items
  const addLearningItem = (item: Omit<LearningItem, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      learning: [
        ...prev.learning,
        {
          ...item,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        }
      ]
    }));
    toast.success("Learning skill added");
  };

  const updateLearningItem = (itemId: string, updates: Partial<LearningItem>) => {
    setData(prev => ({
      ...prev,
      learning: prev.learning.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
    toast.success("Learning skill updated");
  };

  const deleteLearningItem = (itemId: string) => {
    setData(prev => ({
      ...prev,
      learning: prev.learning.filter(item => item.id !== itemId)
    }));
    toast.success("Learning skill deleted");
  };

  // Resources for learning items
  const addResource = (learningItemId: string, resource: Omit<Resource, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      learning: prev.learning.map(item => 
        item.id === learningItemId ? {
          ...item,
          resources: [
            ...item.resources,
            {
              ...resource,
              id: uuidv4(),
              createdAt: new Date().toISOString(),
            }
          ]
        } : item
      )
    }));
    toast.success("Resource added");
  };

  const deleteResource = (learningItemId: string, resourceId: string) => {
    setData(prev => ({
      ...prev,
      learning: prev.learning.map(item => 
        item.id === learningItemId ? {
          ...item,
          resources: item.resources.filter(res => res.id !== resourceId)
        } : item
      )
    }));
    toast.success("Resource deleted");
  };

  // Projects
  const addProject = (project: Omit<Project, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          ...project,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        }
      ]
    }));
    toast.success("Project added");
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === projectId ? { ...project, ...updates } : project
      )
    }));
    toast.success("Project updated");
  };

  const deleteProject = (projectId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== projectId)
    }));
    toast.success("Project deleted");
  };

  // Project tasks
  const addProjectTask = (projectId: string, task: Omit<Task, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === projectId ? {
          ...project,
          tasks: [
            ...project.tasks,
            {
              ...task,
              id: uuidv4(),
              createdAt: new Date().toISOString(),
            }
          ]
        } : project
      )
    }));
    toast.success("Project task added");
  };

  const updateProjectTask = (projectId: string, taskId: string, updates: Partial<Task>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === projectId ? {
          ...project,
          tasks: project.tasks.map(task => 
            task.id === taskId ? { ...task, ...updates } : task
          )
        } : project
      )
    }));
    toast.success("Project task updated");
  };

  const deleteProjectTask = (projectId: string, taskId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === projectId ? {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId)
        } : project
      )
    }));
    toast.success("Project task deleted");
  };

  // Project resources
  const addProjectResource = (projectId: string, resource: Omit<Resource, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === projectId ? {
          ...project,
          resources: [
            ...project.resources,
            {
              ...resource,
              id: uuidv4(),
              createdAt: new Date().toISOString(),
            }
          ]
        } : project
      )
    }));
    toast.success("Project resource added");
  };

  const deleteProjectResource = (projectId: string, resourceId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === projectId ? {
          ...project,
          resources: project.resources.filter(res => res.id !== resourceId)
        } : project
      )
    }));
    toast.success("Project resource deleted");
  };

  // Internship updates
  const addInternshipUpdate = (update: Omit<InternshipUpdate, "id">) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        updates: [
          ...prev.internship.updates,
          {
            ...update,
            id: uuidv4(),
          }
        ]
      }
    }));
    toast.success("Internship update added");
  };

  const updateInternshipUpdate = (updateId: string, updates: Partial<InternshipUpdate>) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        updates: prev.internship.updates.map(update => 
          update.id === updateId ? { ...update, ...updates } : update
        )
      }
    }));
    toast.success("Internship update modified");
  };

  const deleteInternshipUpdate = (updateId: string) => {
    setData(prev => ({
      ...prev,
      internship: {
        ...prev.internship,
        updates: prev.internship.updates.filter(update => update.id !== updateId)
      }
    }));
    toast.success("Internship update deleted");
  };

  // Content ideas
  const addContentIdea = (idea: Omit<ContentIdea, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      contentCreation: [
        ...prev.contentCreation,
        {
          ...idea,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        }
      ]
    }));
    toast.success("Content idea added");
  };

  const updateContentIdea = (ideaId: string, updates: Partial<ContentIdea>) => {
    setData(prev => ({
      ...prev,
      contentCreation: prev.contentCreation.map(idea => 
        idea.id === ideaId ? { ...idea, ...updates } : idea
      )
    }));
    toast.success("Content idea updated");
  };

  const deleteContentIdea = (ideaId: string) => {
    setData(prev => ({
      ...prev,
      contentCreation: prev.contentCreation.filter(idea => idea.id !== ideaId)
    }));
    toast.success("Content idea deleted");
  };

  // Gym entries
  const addGymEntry = (entry: Omit<GymEntry, "id">) => {
    setData(prev => ({
      ...prev,
      gymLife: [
        ...prev.gymLife,
        {
          ...entry,
          id: uuidv4(),
        }
      ]
    }));
    toast.success("Gym entry added");
  };

  const deleteGymEntry = (entryId: string) => {
    setData(prev => ({
      ...prev,
      gymLife: prev.gymLife.filter(entry => entry.id !== entryId)
    }));
    toast.success("Gym entry deleted");
  };

  // Scrum Board functions
  const addScrumCard = (card: Omit<ScrumCard, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      scrumBoard: [
        ...prev.scrumBoard,
        {
          ...card,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        }
      ]
    }));
    toast.success("Card added to Scrum Board");
  };

  const updateScrumCardStatus = (cardId: string, status: ScrumCard["status"]) => {
    setData(prev => ({
      ...prev,
      scrumBoard: prev.scrumBoard.map(card => 
        card.id === cardId ? { ...card, status } : card
      )
    }));
    toast.success(`Card moved to ${status === 'todo' ? 'Todo' : status === 'inProgress' ? 'In Progress' : 'Done'}`);
  };

  const updateScrumCard = (cardId: string, updates: Partial<ScrumCard>) => {
    setData(prev => ({
      ...prev,
      scrumBoard: prev.scrumBoard.map(card => 
        card.id === cardId ? { ...card, ...updates } : card
      )
    }));
    toast.success("Card updated");
  };

  const deleteScrumCard = (cardId: string) => {
    setData(prev => ({
      ...prev,
      scrumBoard: prev.scrumBoard.filter(card => card.id !== cardId)
    }));
    toast.success("Card deleted");
  };

  // Meeting functions
  const addMeeting = (meeting: Omit<Meeting, "id" | "createdAt">) => {
    setData(prev => ({
      ...prev,
      meetings: [
        ...prev.meetings,
        {
          ...meeting,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        }
      ]
    }));
    toast.success("Meeting added");
  };

  const updateMeeting = (meetingId: string, updates: Partial<Meeting>) => {
    setData(prev => ({
      ...prev,
      meetings: prev.meetings.map(meeting => 
        meeting.id === meetingId ? { ...meeting, ...updates } : meeting
      )
    }));
    toast.success("Meeting updated");
  };

  const deleteMeeting = (meetingId: string) => {
    setData(prev => ({
      ...prev,
      meetings: prev.meetings.filter(meeting => meeting.id !== meetingId)
    }));
    toast.success("Meeting deleted");
  };

  const addMeetingActionItem = (meetingId: string, actionItem: Omit<Meeting["actionItems"][0], "id">) => {
    setData(prev => ({
      ...prev,
      meetings: prev.meetings.map(meeting => 
        meeting.id === meetingId ? {
          ...meeting,
          actionItems: [
            ...(meeting.actionItems || []),
            {
              ...actionItem,
              id: uuidv4(),
            }
          ]
        } : meeting
      )
    }));
    toast.success("Action item added");
  };

  const updateMeetingActionItem = (meetingId: string, actionItemId: string, updates: Partial<Omit<Meeting["actionItems"][0], "id">>) => {
    setData(prev => ({
      ...prev,
      meetings: prev.meetings.map(meeting => 
        meeting.id === meetingId ? {
          ...meeting,
          actionItems: meeting.actionItems?.map(item => 
            item.id === actionItemId ? { ...item, ...updates } : item
          )
        } : meeting
      )
    }));
    toast.success("Action item updated");
  };

  const deleteMeetingActionItem = (meetingId: string, actionItemId: string) => {
    setData(prev => ({
      ...prev,
      meetings: prev.meetings.map(meeting => 
        meeting.id === meetingId ? {
          ...meeting,
          actionItems: meeting.actionItems?.filter(item => item.id !== actionItemId)
        } : meeting
      )
    }));
    toast.success("Action item deleted");
  };

  return (
    <TrackerContext.Provider value={{
      data,
      addTask,
      updateTask,
      deleteTask,
      addInternshipTask,
      updateInternshipTask,
      deleteInternshipTask,
      addLearningItem,
      updateLearningItem,
      deleteLearningItem,
      addResource,
      deleteResource,
      addProject,
      updateProject,
      deleteProject,
      addProjectTask,
      updateProjectTask,
      deleteProjectTask,
      addProjectResource,
      deleteProjectResource,
      addInternshipUpdate,
      updateInternshipUpdate,
      deleteInternshipUpdate,
      addContentIdea,
      updateContentIdea,
      deleteContentIdea,
      addGymEntry,
      deleteGymEntry,
      // Scrum Board methods
      addScrumCard,
      updateScrumCardStatus,
      updateScrumCard,
      deleteScrumCard,
      // Meeting methods
      addMeeting,
      updateMeeting,
      deleteMeeting,
      addMeetingActionItem,
      updateMeetingActionItem,
      deleteMeetingActionItem,
    }}>
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => {
  const context = useContext(TrackerContext);
  if (context === undefined) {
    throw new Error("useTracker must be used within a TrackerProvider");
  }
  return context;
};
