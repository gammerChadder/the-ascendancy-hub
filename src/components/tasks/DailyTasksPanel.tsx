
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import TaskList from "./TaskList";
import { Task } from "@/types";

interface DailyTasksPanelProps {
  tasks: Task[];
  onToggleCompletion: (taskId: string, currentStatus: boolean) => void;
  onDelete: (taskId: string) => void;
}

const DailyTasksPanel: React.FC<DailyTasksPanelProps> = ({ tasks, onToggleCompletion, onDelete }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Clock className="mr-2 h-5 w-5 text-brand-500" />
          Daily Tasks
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tasks to complete today</p>
      </CardHeader>
      <CardContent>
        <TaskList
          tasks={tasks}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
          emptyMessage="No daily tasks added yet. Click 'Daily Task' to add one!"
        />
      </CardContent>
    </Card>
  );
};

export default DailyTasksPanel;
