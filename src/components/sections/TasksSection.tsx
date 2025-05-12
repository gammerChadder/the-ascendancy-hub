
import React, { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddItemDialog from "../ui-components/AddItemDialog";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Trash2, 
  Plus,
  CheckCircle,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        <AddItemDialog
          title="Add Daily Task"
          isOpen={isAddDailyTaskOpen}
          onClose={() => setIsAddDailyTaskOpen(false)}
          onSubmit={handleAddDailyTask}
          fields={[
            { name: "title", label: "Task Title", type: "text", required: true },
            { name: "description", label: "Description", type: "textarea" },
            { name: "dueDate", label: "Due Date", type: "date" }
          ]}
        />

        <AddItemDialog
          title="Add Long Term Plan"
          isOpen={isAddLongTermPlanOpen}
          onClose={() => setIsAddLongTermPlanOpen(false)}
          onSubmit={handleAddLongTermPlan}
          fields={[
            { name: "title", label: "Plan Title", type: "text", required: true },
            { name: "description", label: "Description", type: "textarea" },
            { name: "dueDate", label: "Target Date", type: "date" }
          ]}
        />

        <TabsContent value="daily" className="pt-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Clock className="mr-2 h-5 w-5 text-brand-500" />
                Daily Tasks
              </CardTitle>
              <p className="text-sm text-gray-500">Tasks to complete today</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {data.dailyTasks.length > 0 ? (
                  <div className="space-y-2">
                    {data.dailyTasks.map((task) => (
                      <div 
                        key={task.id} 
                        className={`flex justify-between items-center p-3 rounded-md ${
                          task.completed ? 'bg-gray-50' : 'bg-white border border-gray-100'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            checked={task.completed} 
                            onCheckedChange={() => toggleTaskCompletion("dailyTasks", task.id, task.completed)}
                            className="mt-1"
                          />
                          <div>
                            <p className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                              {task.title}
                            </p>
                            {task.description && (
                              <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                                {task.description}
                              </p>
                            )}
                            {task.dueDate && (
                              <div className="flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                                <span className="text-xs text-gray-400">
                                  {format(new Date(task.dueDate), "PPP")}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask("dailyTasks", task.id)}
                          className="opacity-50 hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No daily tasks added yet. Click "Daily Task" to add one!
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="longterm" className="pt-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-brand-500" />
                Long Term Plans
              </CardTitle>
              <p className="text-sm text-gray-500">Plans and goals for your development journey</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {data.longTermPlans.length > 0 ? (
                  <div className="space-y-3">
                    {data.longTermPlans.map((plan) => (
                      <div 
                        key={plan.id} 
                        className={`flex justify-between items-center p-4 rounded-md ${
                          plan.completed ? 'bg-gray-50' : 'bg-white border border-gray-100'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            checked={plan.completed} 
                            onCheckedChange={() => toggleTaskCompletion("longTermPlans", plan.id, plan.completed)}
                            className="mt-1"
                          />
                          <div>
                            <p className={`font-medium ${plan.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                              {plan.title}
                            </p>
                            {plan.description && (
                              <p className={`text-sm ${plan.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                                {plan.description}
                              </p>
                            )}
                            {plan.dueDate && (
                              <div className="flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                                <span className="text-xs text-gray-400">
                                  Target: {format(new Date(plan.dueDate), "PPP")}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask("longTermPlans", plan.id)}
                          className="opacity-50 hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No long term plans added yet. Click "Long Term Plan" to add one!
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TasksSection;
