
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Trash2 } from "lucide-react";

interface NotesSectionProps {
  id: string;
  notes: string | undefined;
  notesEdit: { id: string; notes: string } | null;
  setNotesEdit: React.Dispatch<React.SetStateAction<{ id: string; notes: string } | null>>;
  onUpdateNotes: (id: string) => void;
  handleCancelEdit: () => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  id,
  notes,
  notesEdit,
  setNotesEdit,
  onUpdateNotes,
  handleCancelEdit
}) => {
  const isEditing = notesEdit && notesEdit.id === id;

  // Function to handle notes deletion
  const handleDeleteNotes = () => {
    setNotesEdit({ id, notes: "" });
    onUpdateNotes(id);
  };

  if (isEditing) {
    return (
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
            onClick={() => onUpdateNotes(id)}
            className="h-8 bg-brand-500 hover:bg-brand-600"
          >
            Save
          </Button>
        </div>
      </div>
    );
  }

  if (notes) {
    return (
      <div className="relative group">
        <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">{notes}</p>
        <div className="absolute top-2 right-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost" 
            size="sm" 
            className="h-6 w-6"
            onClick={() => onUpdateNotes(id)}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            onClick={handleDeleteNotes}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs text-gray-500 dark:text-gray-400 w-full"
      onClick={() => onUpdateNotes(id)}
    >
      <Plus size={12} className="mr-1" /> Add Notes
    </Button>
  );
};

export default NotesSection;
