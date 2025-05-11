
import React, { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "../ui-components/ProgressBar";
import AddItemDialog from "../ui-components/AddItemDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Book, 
  Link, 
  Trash2, 
  Plus, 
  Edit,
  Check,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const LearningSection: React.FC = () => {
  const { data, addLearningItem, updateLearningItem, deleteLearningItem, addResource, deleteResource } = useTracker();
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [progressEdit, setProgressEdit] = useState<{ id: string; progress: number } | null>(null);
  const [notesEdit, setNotesEdit] = useState<{ id: string; notes: string } | null>(null);

  const handleAddSkill = (formData: Record<string, any>) => {
    addLearningItem({
      skill: formData.skill,
      resources: [],
      progress: Number(formData.progress) || 0,
      notes: formData.notes,
    });
  };

  const handleAddResource = (formData: Record<string, any>) => {
    if (selectedSkillId) {
      addResource(selectedSkillId, {
        title: formData.title,
        url: formData.url,
        description: formData.description,
      });
    }
  };

  const handleUpdateProgress = (id: string) => {
    if (progressEdit && progressEdit.id === id) {
      updateLearningItem(id, { progress: progressEdit.progress });
      setProgressEdit(null);
    } else {
      const skill = data.learning.find(item => item.id === id);
      if (skill) {
        setProgressEdit({ id, progress: skill.progress });
      }
    }
  };

  const handleUpdateNotes = (id: string) => {
    if (notesEdit && notesEdit.id === id) {
      updateLearningItem(id, { notes: notesEdit.notes });
      setNotesEdit(null);
    } else {
      const skill = data.learning.find(item => item.id === id);
      if (skill) {
        setNotesEdit({ id, notes: skill.notes || "" });
      }
    }
  };

  const handleCancelEdit = () => {
    setProgressEdit(null);
    setNotesEdit(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <Book className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
          Learning
        </h2>
        <Button onClick={() => setIsAddSkillOpen(true)} className="bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700">
          <Plus size={16} className="mr-2" />
          Add Skill
        </Button>
      </div>

      <AddItemDialog
        title="Add New Skill"
        description="Track a new skill you want to learn"
        isOpen={isAddSkillOpen}
        onClose={() => setIsAddSkillOpen(false)}
        onSubmit={handleAddSkill}
        fields={[
          { name: "skill", label: "Skill Name", type: "text", required: true },
          { name: "progress", label: "Current Progress (%)", type: "number", placeholder: "0" },
          { name: "notes", label: "Notes", type: "textarea" }
        ]}
      />

      <AddItemDialog
        title="Add Resource"
        description="Add a learning resource"
        isOpen={isAddResourceOpen}
        onClose={() => setIsAddResourceOpen(false)}
        onSubmit={handleAddResource}
        fields={[
          { name: "title", label: "Title", type: "text", required: true },
          { name: "url", label: "URL", type: "url", required: true },
          { name: "description", label: "Description", type: "textarea" }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.learning.length === 0 ? (
          <Card className="col-span-full dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-40">
              <Book className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-3" />
              <p>No skills added yet. Click "Add Skill" to get started!</p>
            </CardContent>
          </Card>
        ) : (
          data.learning.map((skill) => (
            <Card key={skill.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200 dark:bg-gray-800/80 dark:border-gray-700">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="flex items-center text-xl dark:text-white">
                    <Book className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                    {skill.skill}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => deleteLearningItem(skill.id)} className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  {progressEdit && progressEdit.id === skill.id ? (
                    <div className="flex items-center space-x-2 w-full">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={progressEdit.progress}
                        onChange={(e) => setProgressEdit({ ...progressEdit, progress: Number(e.target.value) })}
                        className="w-16 h-8"
                      />
                      <span className="dark:text-gray-300">%</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-green-600" 
                        onClick={() => handleUpdateProgress(skill.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-600" 
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="dark:text-gray-300">Progress</span>
                        <span className="font-medium dark:text-white">{skill.progress}%</span>
                      </div>
                      <div className="relative">
                        <ProgressBar progress={skill.progress} />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-6 w-6 opacity-70 hover:opacity-100"
                          onClick={() => handleUpdateProgress(skill.id)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pb-2 space-y-4">
                {notesEdit && notesEdit.id === skill.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={notesEdit.notes}
                      onChange={(e) => setNotesEdit({ ...notesEdit, notes: e.target.value })}
                      placeholder="Add your notes here..."
                      className="min-h-[80px] text-sm"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleCancelEdit}
                        className="h-8"
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleUpdateNotes(skill.id)}
                        className="h-8 bg-brand-500 hover:bg-brand-600"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  skill.notes ? (
                    <div className="relative group">
                      <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">{skill.notes}</p>
                      <Button
                        variant="ghost" 
                        size="sm" 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                        onClick={() => handleUpdateNotes(skill.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs text-gray-500 dark:text-gray-400 w-full"
                      onClick={() => handleUpdateNotes(skill.id)}
                    >
                      <Plus size={12} className="mr-1" /> Add Notes
                    </Button>
                  )
                )}
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm dark:text-gray-300">Resources</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSelectedSkillId(skill.id);
                        setIsAddResourceOpen(true);
                      }}
                      className="text-xs"
                    >
                      <Plus size={14} className="mr-1" /> Add
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-36 rounded-md border border-gray-100 dark:border-gray-700 p-1">
                    {skill.resources.length > 0 ? (
                      <div className="space-y-2 p-1">
                        {skill.resources.map((resource) => (
                          <div 
                            key={resource.id} 
                            className="flex justify-between items-start p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-100 dark:border-gray-700"
                          >
                            <div>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-brand-600 dark:text-brand-400 flex items-center hover:underline"
                              >
                                <Link size={12} className="mr-1 flex-shrink-0" />
                                {resource.title}
                              </a>
                              {resource.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{resource.description}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-2"
                              onClick={() => deleteResource(skill.id, resource.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 dark:text-gray-500 text-center p-4">No resources added</p>
                    )}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LearningSection;
