
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrackerProvider } from "@/context/TrackerContext";
import LearningSection from "./sections/LearningSection";
import TasksSection from "./sections/TasksSection";
import ProjectsSection from "./sections/ProjectsSection";
import InternshipSection from "./sections/InternshipSection";
import ContentCreationSection from "./sections/ContentCreationSection";
import GymLifeSection from "./sections/GymLifeSection";
import ScrumBoardSection from "./sections/ScrumBoardSection";
import { 
  Book, 
  CalendarCheck, 
  Projector, 
  Briefcase,
  Video,
  Dumbbell,
  SquareKanban
} from "lucide-react";

const DevTrackerDashboard: React.FC = () => {
  return (
    <TrackerProvider>
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-blue-600">
              Developer Growth Tracker
            </h1>
            <p className="text-gray-600 mt-2">
              Track your journey to becoming a 0-100x developer
            </p>
          </div>

          <Tabs defaultValue="learning" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 mb-8">
              <TabsTrigger value="learning" className="flex items-center">
                <Book className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Learning</span>
                <span className="md:hidden">📚</span>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center">
                <CalendarCheck className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Tasks & Plans</span>
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
            
            <div className="bg-white shadow-sm rounded-lg p-4 md:p-6 border border-gray-100">
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
