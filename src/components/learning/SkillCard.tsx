
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "../ui-components/ProgressBar";
import { Input } from "../ui/input";
import { Trash2, ExternalLink } from "lucide-react";
import { Resource } from "@/types";
import NotesSection from "./NotesSection";
import ResourcesSection from "./ResourcesSection";

interface Note {
  id: string;
  content: string;
}

interface SkillCardProps {
  id: string;
  skill: string;
  progress: number;
  notes: Note[];
  resources: Resource[];
  progressEdit: { id: string; progress: number } | null;
  setProgressEdit: React.Dispatch<React.SetStateAction<{ id: string; progress: number } | null>>;
  handleCancelEdit: () => void;
  onDelete: (id: string) => void;
  onUpdateProgress: (id: string) => void;
  onAddNote: (skillId: string, content: string) => void;
  onDeleteNote: (skillId: string, noteId: string) => void;
  onAddResource: (id: string) => void;
  onDeleteResource: (skillId: string, resourceId: string) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  id,
  skill,
  progress,
  notes,
  resources,
  progressEdit,
  setProgressEdit,
  handleCancelEdit,
  onDelete,
  onUpdateProgress,
  onAddNote,
  onDeleteNote,
  onAddResource,
  onDeleteResource
}) => {
  const isEditing = progressEdit && progressEdit.id === id;

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow transition-shadow duration-200 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">{skill}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="h-6 w-6 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-2">
        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="text-gray-600 dark:text-gray-300">Progress</span>
            <span className="font-medium text-brand-600 dark:text-brand-400">{progress}%</span>
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <Input
                type="number"
                value={progressEdit.progress}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 100) {
                    setProgressEdit({ ...progressEdit, progress: value });
                  }
                }}
                min="0"
                max="100"
                className="h-8"
              />
              <div className="flex justify-end space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="h-7 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => onUpdateProgress(id)}
                  className="h-7 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-xs"
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div onClick={() => onUpdateProgress(id)} className="cursor-pointer">
              <ProgressBar progress={progress} />
            </div>
          )}
        </div>

        <NotesSection
          id={id}
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
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

export default SkillCard;
