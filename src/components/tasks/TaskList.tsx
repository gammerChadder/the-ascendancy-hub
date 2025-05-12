
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskItem from "./TaskItem";
import { Task } from "@/types";

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (taskId: string, currentStatus: boolean) => void;
  onDelete: (taskId: string) => void;
  emptyMessage: string;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleCompletion, 
  onDelete,
  emptyMessage
}) => {
  return (
    <ScrollArea className="h-[300px] pr-4">
      {tasks.length > 0 ? (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleCompletion={onToggleCompletion}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </div>
      )}
    </ScrollArea>
  );
};

export default TaskList;
