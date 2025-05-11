
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrackerProvider } from "@/context/TrackerContext";
import LearningSection from "./sections/LearningSection";
import TasksSection from "./sections/TasksSection";
import ProjectsSection from "./sections/ProjectsSection";
import InternshipSection from "./sections/InternshipSection";
import ContentCreationSection from "./sections/ContentCreationSection";
import GymLifeSection from "./sections/GymLifeSection";
import ScrumBoardSection from "./sections/ScrumBoardSection";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  CalendarCheck, 
  Projector, 
  Briefcase,
  Video,
  Dumbbell,
  SquareKanban,
  Moon,
  Sun
} from "lucide-react";

const DevTrackerDashboard: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for user preference in localStorage
    const savedTheme = localStorage.getItem('dev-tracker-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Use system preference if no saved preference
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('dev-tracker-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <TrackerProvider>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-blue-600 dark:from-brand-300 dark:to-blue-400">
                Developer Growth Tracker
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Track your journey to becoming a 0-100x developer
              </p>
            </div>
            <Button 
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          <Tabs defaultValue="learning" className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-7 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-1">
              <TabsTrigger value="learning" className="flex items-center">
                <Book className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Learning</span>
                <span className="md:hidden">📚</span>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center">
                <CalendarCheck className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Tasks</span>
                <span className="md:hidden">✓</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center">
                <Projector className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Projects</span>
                <span className="md:hidden">🚀</span>
              </TabsTrigger>
              <TabsTrigger value="internship" className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Internship</span>
                <span className="md:hidden">💼</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Content</span>
                <span className="md:hidden">🎬</span>
              </TabsTrigger>
              <TabsTrigger value="gym" className="flex items-center">
                <Dumbbell className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Gym & Life</span>
                <span className="md:hidden">💪</span>
              </TabsTrigger>
              <TabsTrigger value="scrumboard" className="flex items-center">
                <SquareKanban className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Scrum Board</span>
                <span className="md:hidden">📋</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 md:p-6 border border-gray-100 dark:border-gray-700">
              <TabsContent value="learning" className="mt-0">
                <LearningSection />
              </TabsContent>
              <TabsContent value="tasks" className="mt-0">
                <TasksSection />
              </TabsContent>
              <TabsContent value="projects" className="mt-0">
                <ProjectsSection />
              </TabsContent>
              <TabsContent value="internship" className="mt-0">
                <InternshipSection />
              </TabsContent>
              <TabsContent value="content" className="mt-0">
                <ContentCreationSection />
              </TabsContent>
              <TabsContent value="gym" className="mt-0">
                <GymLifeSection />
              </TabsContent>
              <TabsContent value="scrumboard" className="mt-0">
                <ScrumBoardSection />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </TrackerProvider>
  );
};

export default DevTrackerDashboard;
