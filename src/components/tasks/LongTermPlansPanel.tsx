
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import TaskList from "./TaskList";
import { Task } from "@/types";

interface LongTermPlansPanelProps {
  plans: Task[];
  onToggleCompletion: (planId: string, currentStatus: boolean) => void;
  onDelete: (planId: string) => void;
}

const LongTermPlansPanel: React.FC<LongTermPlansPanelProps> = ({ plans, onToggleCompletion, onDelete }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-brand-500" />
          Long Term Plans
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">Plans and goals for your development journey</p>
      </CardHeader>
      <CardContent>
        <TaskList
          tasks={plans}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
          emptyMessage="No long term plans added yet. Click 'Long Term Plan' to add one!"
        />
      </CardContent>
    </Card>
  );
};

export default LongTermPlansPanel;
