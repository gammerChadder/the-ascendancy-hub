
import React, { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { Button } from "@/components/ui/button";
import { Book, Plus } from "lucide-react";
import AddItemDialog from "../ui-components/AddItemDialog";
import SkillCard from "../learning/SkillCard";
import EmptySkillsCard from "../learning/EmptySkillsCard";
import NotesSection from "../learning/NotesSection";
import ResourcesSection from "../learning/ResourcesSection";
import { v4 as uuidv4 } from "uuid";

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
      notes: [],
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

  const handleAddNote = (skillId: string, content: string) => {
    const skill = data.learning.find(item => item.id === skillId);
    if (skill) {
      const notes = Array.isArray(skill.notes) ? skill.notes : [];
      const newNote = { id: uuidv4(), content };
      updateLearningItem(skillId, { notes: [...notes, newNote] });
    }
  };

  const handleDeleteNote = (skillId: string, noteId: string) => {
    const skill = data.learning.find(item => item.id === skillId);
    if (skill && Array.isArray(skill.notes)) {
      const updatedNotes = skill.notes.filter(note => note.id !== noteId);
      updateLearningItem(skillId, { notes: updatedNotes });
    }
  };

  const handleOpenAddResource = (skillId: string) => {
    setSelectedSkillId(skillId);
    setIsAddResourceOpen(true);
  };

  const handleCancelEdit = () => {
    setProgressEdit(null);
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
          { name: "progress", label: "Current Progress (%)", type: "number", placeholder: "0" }
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
          <EmptySkillsCard />
        ) : (
          data.learning.map((skill) => (
            <SkillCard
              key={skill.id}
              id={skill.id}
              skill={skill.skill}
              progress={skill.progress}
              notes={skill.notes || []}
              resources={skill.resources}
              onDelete={deleteLearningItem}
              onUpdateProgress={handleUpdateProgress}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onAddResource={handleOpenAddResource}
              onDeleteResource={deleteResource}
              progressEdit={progressEdit}
              setProgressEdit={setProgressEdit}
              handleCancelEdit={handleCancelEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LearningSection;
