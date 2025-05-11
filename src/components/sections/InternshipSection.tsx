
import React, { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddItemDialog from "../ui-components/AddItemDialog";
import {
  Briefcase,
  Trash2,
  Plus,
  CheckSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

const InternshipSection: React.FC = () => {
  const { 
    data, 
    addInternshipTask, 
    updateInternshipTask, 
    deleteInternshipTask,
    addInternshipUpdate,
    deleteInternshipUpdate 
  } = useTracker();
  
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddUpdateOpen, setIsAddUpdateOpen] = useState(false);

  const handleAddTask = (formData: Record<string, any>) => {
    addInternshipTask({
      title: formData.title,
      description: formData.description,
      completed: false,
    });
  };

  const handleAddUpdate = (formData: Record<string, any>) => {
    const tags = formData.tags ? formData.tags.split(",").map((tag: string) => tag.trim()) : [];
    
    addInternshipUpdate({
      title: formData.title,
      description: formData.description,
      date: formData.date || new Date().toISOString(),
      tags,
    });
  };

  const toggleTaskCompletion = (id: string, currentStatus: boolean) => {
    updateInternshipTask(id, { completed: !currentStatus });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Internship</h2>
      </div>

      <Tabs defaultValue="updates" className="w-full">
        <div className="flex justify-between items-center mb-2">
          <TabsList>
            <TabsTrigger value="updates" className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              Updates
            </TabsTrigger>
            <TabsTrigger value="todos" className="flex items-center">
              <CheckSquare className="mr-2 h-4 w-4" />
              To-Do
            </TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <Button onClick={() => setIsAddUpdateOpen(true)} size="sm">
              <Plus size={16} className="mr-2" />
              New Update
            </Button>
            <Button onClick={() => setIsAddTaskOpen(true)} size="sm">
              <Plus size={16} className="mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <AddItemDialog
          title="Add Internship Task"
          isOpen={isAddTaskOpen}
          onClose={() => setIsAddTaskOpen(false)}
          onSubmit={handleAddTask}
          fields={[
            { name: "title", label: "Task Title", type: "text", required: true },
            { name: "description", label: "Description", type: "textarea" }
          ]}
        />

        <AddItemDialog
          title="Add Internship Update"
          isOpen={isAddUpdateOpen}
          onClose={() => setIsAddUpdateOpen(false)}
          onSubmit={handleAddUpdate}
          fields={[
            { name: "title", label: "Update Title", type: "text", required: true },
            { name: "description", label: "Description", type: "textarea", required: true },
            { name: "date", label: "Date", type: "date" },
            { name: "tags", label: "Tags (comma separated)", type: "text", placeholder: "e.g., bugfix, meeting, learning" }
          ]}
        />

        <TabsContent value="updates" className="pt-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-brand-500" />
                Internship Updates
              </CardTitle>
              <p className="text-sm text-gray-500">Track your progress and accomplishments</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {data.internship.updates.length > 0 ? (
                  <div className="space-y-4">
                    {data.internship.updates.map((update) => (
                      <div key={update.id} className="border border-gray-100 rounded-md p-4 relative">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800">{update.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {update.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="text-xs text-gray-400 mt-2">
                              {format(new Date(update.date), "PPP")}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteInternshipUpdate(update.id)}
                            className="opacity-50 hover:opacity-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No updates added yet. Click "New Update" to add one!
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="todos" className="pt-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <CheckSquare className="mr-2 h-5 w-5 text-brand-500" />
                Internship Tasks
              </CardTitle>
              <p className="text-sm text-gray-500">Tasks to complete for your internship</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {data.internship.todos.length > 0 ? (
                  <div className="space-y-2">
                    {data.internship.todos.map((task) => (
                      <div 
                        key={task.id} 
                        className={`flex justify-between items-start p-3 rounded-md ${
                          task.completed ? 'bg-gray-50' : 'bg-white border border-gray-100'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            checked={task.completed} 
                            onCheckedChange={() => toggleTaskCompletion(task.id, task.completed)}
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
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteInternshipTask(task.id)}
                          className="opacity-50 hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No internship tasks added yet. Click "New Task" to add one!
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

export default InternshipSection;
