
import React, { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "../ui-components/ProgressBar";
import AddItemDialog from "../ui-components/AddItemDialog";
import { 
  Projector, 
  CheckSquare, 
  Link, 
  Trash2, 
  Plus, 
  Edit,
  ArrowUpRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ProjectsSection: React.FC = () => {
  const { 
    data, 
    addProject, 
    updateProject, 
    deleteProject,
    addProjectTask,
    updateProjectTask,
    deleteProjectTask,
    addProjectResource,
    deleteProjectResource
  } = useTracker();
  
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [progressEdit, setProgressEdit] = useState<{ id: string; progress: number } | null>(null);

  const handleAddProject = (formData: Record<string, any>) => {
    addProject({
      title: formData.title,
      description: formData.description,
      status: formData.status || 'not-started',
      tasks: [],
      resources: [],
      progress: 0,
    });
  };

  const handleAddTask = (formData: Record<string, any>) => {
    if (selectedProjectId) {
      addProjectTask(selectedProjectId, {
        title: formData.title,
        description: formData.description,
        completed: false,
      });
      
      // Update progress
      const project = data.projects.find(p => p.id === selectedProjectId);
      if (project) {
        const taskCount = project.tasks.length + 1; // +1 for the new task
        const completedCount = project.tasks.filter(t => t.completed).length;
        const newProgress = taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;
        updateProject(selectedProjectId, { progress: newProgress });
      }
    }
  };

  const handleAddResource = (formData: Record<string, any>) => {
    if (selectedProjectId) {
      addProjectResource(selectedProjectId, {
        title: formData.title,
        url: formData.url,
        description: formData.description,
      });
    }
  };

  const handleUpdateProgress = (id: string) => {
    if (progressEdit && progressEdit.id === id) {
      updateProject(id, { progress: progressEdit.progress });
      setProgressEdit(null);
    } else {
      const project = data.projects.find(p => p.id === id);
      if (project) {
        setProgressEdit({ id, progress: project.progress });
      }
    }
  };

  const handleToggleTask = (projectId: string, taskId: string, currentStatus: boolean) => {
    updateProjectTask(projectId, taskId, { completed: !currentStatus });
    
    // Update project progress
    const project = data.projects.find(p => p.id === projectId);
    if (project) {
      const completedCount = project.tasks.filter(
        t => t.id === taskId ? !currentStatus : t.completed
      ).length;
      const newProgress = project.tasks.length > 0 
        ? Math.round((completedCount / project.tasks.length) * 100) 
        : 0;
      updateProject(projectId, { progress: newProgress });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'not-started':
        return <Badge variant="outline" className="text-gray-500 border-gray-300">Not Started</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <Button onClick={() => setIsAddProjectOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add Project
        </Button>
      </div>

      <AddItemDialog
        title="Add New Project"
        isOpen={isAddProjectOpen}
        onClose={() => setIsAddProjectOpen(false)}
        onSubmit={handleAddProject}
        fields={[
          { name: "title", label: "Project Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "status", label: "Status", type: "text", placeholder: "not-started/in-progress/completed" },
        ]}
      />

      <AddItemDialog
        title="Add Task"
        description="Add a task to this project"
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onSubmit={handleAddTask}
        fields={[
          { name: "title", label: "Task Title", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
        ]}
      />

      <AddItemDialog
        title="Add Resource"
        description="Add a resource to this project"
        isOpen={isAddResourceOpen}
        onClose={() => setIsAddResourceOpen(false)}
        onSubmit={handleAddResource}
        fields={[
          { name: "title", label: "Title", type: "text", required: true },
          { name: "url", label: "URL", type: "url", required: true },
          { name: "description", label: "Description", type: "textarea" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.projects.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="pt-6 text-center text-gray-500">
              No projects added yet. Click "Add Project" to get started!
            </CardContent>
          </Card>
        ) : (
          data.projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="flex items-center">
                    <Projector className="mr-2 h-5 w-5 text-brand-500" />
                    {project.title}
                  </CardTitle>
                  <div className="flex">
                    {getStatusBadge(project.status)}
                    <Button variant="ghost" size="icon" onClick={() => deleteProject(project.id)} className="ml-2">
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                </div>
                {project.description && (
                  <p className="text-sm text-gray-600">{project.description}</p>
                )}
                <div className="flex items-center space-x-2 mt-2">
                  {progressEdit && progressEdit.id === project.id ? (
                    <div className="flex items-center space-x-2 w-full">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={progressEdit.progress}
                        onChange={(e) => setProgressEdit({ ...progressEdit, progress: Number(e.target.value) })}
                        className="w-16 h-8"
                      />
                      <span>%</span>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <ProgressBar progress={project.progress} />
                    </div>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleUpdateProgress(project.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tasks">
                    <AccordionTrigger className="py-2 text-sm font-medium">
                      Tasks ({project.tasks.filter(t => t.completed).length}/{project.tasks.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 mb-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setIsAddTaskOpen(true);
                          }}
                        >
                          <Plus size={14} className="mr-1" /> Add Task
                        </Button>
                        
                        <ScrollArea className="h-40">
                          {project.tasks.length > 0 ? (
                            <div className="space-y-2">
                              {project.tasks.map((task) => (
                                <div key={task.id} className="flex justify-between items-start p-2 bg-gray-50 rounded-md">
                                  <div className="flex items-start space-x-2">
                                    <Checkbox 
                                      checked={task.completed} 
                                      onCheckedChange={() => handleToggleTask(project.id, task.id, task.completed)}
                                      className="mt-1"
                                    />
                                    <div>
                                      <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                        {task.title}
                                      </p>
                                      {task.description && (
                                        <p className="text-xs text-gray-500">{task.description}</p>
                                      )}
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => deleteProjectTask(project.id, task.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400 text-center py-4">No tasks added</p>
                          )}
                        </ScrollArea>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="resources">
                    <AccordionTrigger className="py-2 text-sm font-medium">
                      Resources ({project.resources.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 mb-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setIsAddResourceOpen(true);
                          }}
                        >
                          <Plus size={14} className="mr-1" /> Add Resource
                        </Button>
                        
                        <ScrollArea className="h-40">
                          {project.resources.length > 0 ? (
                            <div className="space-y-2">
                              {project.resources.map((resource) => (
                                <div key={resource.id} className="flex justify-between items-start p-2 bg-gray-50 rounded-md">
                                  <div>
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm font-medium text-brand-600 flex items-center hover:underline"
                                    >
                                      <Link size={12} className="mr-1" />
                                      {resource.title}
                                      <ArrowUpRight size={10} className="ml-1" />
                                    </a>
                                    {resource.description && (
                                      <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => deleteProjectResource(project.id, resource.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400 text-center py-4">No resources added</p>
                          )}
                        </ScrollArea>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
