
import React, { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "../ui-components/ProgressBar";
import AddItemDialog from "../ui-components/AddItemDialog";
import { Input } from "@/components/ui/input";
import { 
  Book, 
  Link, 
  Trash2, 
  Plus, 
  Edit
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const LearningSection: React.FC = () => {
  const { data, addLearningItem, updateLearningItem, deleteLearningItem, addResource, deleteResource } = useTracker();
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [progressEdit, setProgressEdit] = useState<{ id: string; progress: number } | null>(null);

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Learning</h2>
        <Button onClick={() => setIsAddSkillOpen(true)}>
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
          <Card className="col-span-full">
            <CardContent className="pt-6 text-center text-gray-500">
              No skills added yet. Click "Add Skill" to get started!
            </CardContent>
          </Card>
        ) : (
          data.learning.map((skill) => (
            <Card key={skill.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="flex items-center">
                    <Book className="mr-2 h-5 w-5 text-brand-500" />
                    {skill.skill}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => deleteLearningItem(skill.id)}>
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
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
                      <span>%</span>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{skill.progress}%</span>
                      </div>
                      <ProgressBar progress={skill.progress} />
                    </div>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleUpdateProgress(skill.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                {skill.notes && (
                  <p className="text-sm text-gray-600 mb-2">{skill.notes}</p>
                )}
                
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">Resources</h4>
                    <Button variant="ghost" size="sm" onClick={() => {
                      setSelectedSkillId(skill.id);
                      setIsAddResourceOpen(true);
                    }}>
                      <Plus size={14} className="mr-1" /> Add
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-36">
                    {skill.resources.length > 0 ? (
                      <div className="space-y-2">
                        {skill.resources.map((resource) => (
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
                              </a>
                              {resource.description && (
                                <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
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
                      <p className="text-sm text-gray-400 text-center">No resources added</p>
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
