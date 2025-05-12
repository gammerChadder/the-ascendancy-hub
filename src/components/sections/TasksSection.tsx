
import React, { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock,
  Plus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyTasksPanel from "../tasks/DailyTasksPanel";
import LongTermPlansPanel from "../tasks/LongTermPlansPanel";
import TaskDialog from "../tasks/TaskDialog";

const TasksSection: React.FC = () => {
  const { data, addTask, updateTask, deleteTask } = useTracker();
  const [isAddDailyTaskOpen, setIsAddDailyTaskOpen] = useState(false);
  const [isAddLongTermPlanOpen, setIsAddLongTermPlanOpen] = useState(false);

  const handleAddDailyTask = (formData: Record<string, any>) => {
    addTask("dailyTasks", {
      title: formData.title,
      description: formData.description,
      completed: false,
      dueDate: formData.dueDate,
    });
  };

  const handleAddLongTermPlan = (formData: Record<string, any>) => {
    addTask("longTermPlans", {
      title: formData.title,
      description: formData.description,
      completed: false,
      dueDate: formData.dueDate,
    });
  };

  const toggleTaskCompletion = (section: "dailyTasks" | "longTermPlans", id: string, currentStatus: boolean) => {
    updateTask(section, id, { completed: !currentStatus });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="daily" className="w-full">
        <div className="flex justify-between items-center mb-2">
          <TabsList>
            <TabsTrigger value="daily" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Daily Tasks
            </TabsTrigger>
            <TabsTrigger value="longterm" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Long Term Plans
            </TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <Button onClick={() => setIsAddDailyTaskOpen(true)} size="sm">
              <Plus size={16} className="mr-2" />
              Daily Task
            </Button>
            <Button onClick={() => setIsAddLongTermPlanOpen(true)} size="sm">
              <Plus size={16} className="mr-2" />
              Long Term Plan
            </Button>
          </div>
        </div>

        <TaskDialog
          title="Add Daily Task"
          isOpen={isAddDailyTaskOpen}
          onClose={() => setIsAddDailyTaskOpen(false)}
          onSubmit={handleAddDailyTask}
        />

        <TaskDialog
          title="Add Long Term Plan"
          isOpen={isAddLongTermPlanOpen}
          onClose={() => setIsAddLongTermPlanOpen(false)}
          onSubmit={handleAddLongTermPlan}
          isLongTerm={true}
        />

        <TabsContent value="daily" className="pt-2">
          <DailyTasksPanel 
            tasks={data.dailyTasks}
            onToggleCompletion={(id, status) => toggleTaskCompletion("dailyTasks", id, status)}
            onDelete={(id) => deleteTask("dailyTasks", id)}
          />
        </TabsContent>

        <TabsContent value="longterm" className="pt-2">
          <LongTermPlansPanel 
            plans={data.longTermPlans}
            onToggleCompletion={(id, status) => toggleTaskCompletion("longTermPlans", id, status)}
            onDelete={(id) => deleteTask("longTermPlans", id)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TasksSection;
