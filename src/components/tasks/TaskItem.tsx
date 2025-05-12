
import React from "react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar, Trash2 } from "lucide-react";
import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggleCompletion: (taskId: string, currentStatus: boolean) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleCompletion, onDelete }) => {
  return (
    <div 
      className={`flex justify-between items-center p-3 rounded-md ${
        task.completed 
          ? 'bg-gray-50 dark:bg-gray-800/50' 
          : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
      }`}
    >
      <div className="flex items-start space-x-3">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={() => onToggleCompletion(task.id, task.completed)}
          className="mt-1"
        />
        <div>
          <p className={`font-medium ${
            task.completed 
              ? 'text-gray-400 dark:text-gray-500 line-through' 
              : 'text-gray-800 dark:text-gray-200'
          }`}>
            {task.title}
          </p>
          {task.description && (
            <p className={`text-sm ${
              task.completed 
                ? 'text-gray-400 dark:text-gray-500' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <div className="flex items-center mt-1">
              <Calendar className="h-3 w-3 mr-1 text-gray-400 dark:text-gray-500" />
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {format(new Date(task.dueDate), "PPP")}
              </span>
            </div>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="opacity-50 hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TaskItem;
