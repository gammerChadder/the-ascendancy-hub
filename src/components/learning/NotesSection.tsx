
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Plus, Trash2 } from "lucide-react";

interface Note {
  id: string;
  content: string;
}

interface NotesSectionProps {
  id: string;
  notes: Note[];
  onAddNote: (skillId: string, content: string) => void;
  onDeleteNote: (skillId: string, noteId: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  id,
  notes,
  onAddNote,
  onDeleteNote
}) => {
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(id, newNote);
      setNewNote("");
      setIsAdding(false);
    }
  };

  const handleCancelAdd = () => {
    setNewNote("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-sm dark:text-gray-300">Notes</h4>
        {!isAdding && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsAdding(true)}
            className="text-xs"
          >
            <Plus size={14} className="mr-1" /> Add
          </Button>
        )}
      </div>
      
      {isAdding && (
        <div className="space-y-2">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add your notes here..."
            className="min-h-[80px] text-sm"
          />
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCancelAdd}
              className="h-8"
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleAddNote}
              className="h-8 bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
            >
              Add Note
            </Button>
          </div>
        </div>
      )}
      
      <ScrollArea className="h-36 rounded-md border border-gray-100 dark:border-gray-700 p-1">
        {notes && notes.length > 0 ? (
          <div className="space-y-2 p-1">
            {notes.map((note) => (
              <div 
                key={note.id} 
                className="relative group p-3 rounded-md border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 pr-6">{note.content}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  onClick={() => onDeleteNote(id, note.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center p-4">No notes added</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotesSection;
