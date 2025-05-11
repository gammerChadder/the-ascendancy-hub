
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Trash2, Edit, Check, X } from "lucide-react";
import ProgressBar from "@/components/ui-components/ProgressBar";
import { Input } from "@/components/ui/input";
import { Resource } from "@/types";
import NotesSection from "./NotesSection";
import ResourcesSection from "./ResourcesSection";

interface SkillCardProps {
  id: string;
  skill: string;
  progress: number;
  notes: string | undefined;
  resources: Resource[];
  onDelete: (id: string) => void;
  onUpdateProgress: (id: string) => void;
  onUpdateNotes: (id: string) => void;
  onAddResource: (id: string) => void;
  onDeleteResource: (skillId: string, resourceId: string) => void;
  progressEdit: { id: string; progress: number } | null;
  notesEdit: { id: string; notes: string } | null;
  setProgressEdit: React.Dispatch<React.SetStateAction<{ id: string; progress: number } | null>>;
  setNotesEdit: React.Dispatch<React.SetStateAction<{ id: string; notes: string } | null>>;
  handleCancelEdit: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  id,
  skill,
  progress,
  notes,
  resources,
  onDelete,
  onUpdateProgress,
  onUpdateNotes,
  onAddResource,
  onDeleteResource,
  progressEdit,
  notesEdit,
  setProgressEdit,
  setNotesEdit,
  handleCancelEdit,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 dark:bg-gray-800/80 dark:border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="flex items-center text-xl dark:text-white">
            <Book className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
            {skill}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(id)}
            className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <ProgressEditSection 
          id={id}
          progress={progress}
          progressEdit={progressEdit}
          setProgressEdit={setProgressEdit}
          onUpdateProgress={onUpdateProgress}
          handleCancelEdit={handleCancelEdit}
        />
      </CardHeader>
      
      <CardContent className="pb-2 space-y-4">
        <NotesSection 
          id={id}
          notes={notes}
          notesEdit={notesEdit} 
          setNotesEdit={setNotesEdit}
          onUpdateNotes={onUpdateNotes}
          handleCancelEdit={handleCancelEdit}
        />
        
        <ResourcesSection
          skillId={id}
          resources={resources}
          onAddResource={onAddResource}
          onDeleteResource={onDeleteResource}
        />
      </CardContent>
    </Card>
  );
};

// Sub-component for progress edit functionality
const ProgressEditSection: React.FC<{
  id: string;
  progress: number;
  progressEdit: { id: string; progress: number } | null;
  setProgressEdit: React.Dispatch<React.SetStateAction<{ id: string; progress: number } | null>>;
  onUpdateProgress: (id: string) => void;
  handleCancelEdit: () => void;
}> = ({ id, progress, progressEdit, setProgressEdit, onUpdateProgress, handleCancelEdit }) => {
  const isEditing = progressEdit && progressEdit.id === id;
  
  return (
    <div className="flex items-center space-x-2 mt-2">
      {isEditing ? (
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
            onClick={() => onUpdateProgress(id)}
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
            <span className="font-medium dark:text-white">{progress}%</span>
          </div>
          <div className="relative">
            <ProgressBar progress={progress} />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 h-6 w-6 opacity-70 hover:opacity-100"
              onClick={() => onUpdateProgress(id)}
            >
              <Edit className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillCard;
