
import React, { useState } from 'react';
import { Meeting } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface MeetingActionItemsProps {
  meetingId: string;
  actionItems: Meeting['actionItems'];
  onAdd: (meetingId: string, actionItem: Omit<Meeting["actionItems"][0], "id">) => void;
  onUpdate: (meetingId: string, actionItemId: string, updates: Partial<Omit<Meeting["actionItems"][0], "id">>) => void;
  onDelete: (meetingId: string, actionItemId: string) => void;
}

const MeetingActionItems: React.FC<MeetingActionItemsProps> = ({
  meetingId,
  actionItems = [],
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [newTask, setNewTask] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>(undefined);
  
  const handleAddActionItem = () => {
    if (newTask.trim()) {
      onAdd(meetingId, {
        task: newTask.trim(),
        assignee: newAssignee.trim() || undefined,
        dueDate: selectedDueDate ? selectedDueDate.toISOString() : undefined,
        completed: false
      });
      setNewTask('');
      setNewAssignee('');
      setSelectedDueDate(undefined);
    }
  };

  const handleToggleComplete = (actionItemId: string, currentStatus: boolean) => {
    onUpdate(meetingId, actionItemId, { completed: !currentStatus });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {actionItems.length > 0 ? (
          actionItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 py-1 group">
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => handleToggleComplete(item.id, item.completed)}
                className="h-5 w-5"
              />
              <div className={cn(
                "flex-grow",
                item.completed && "line-through text-gray-400 dark:text-gray-500"
              )}>
                <div className="text-sm font-medium">{item.task}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  {item.assignee && <span>Assigned to: {item.assignee}</span>}
                  {item.dueDate && (
                    <span>
                      Due: {format(new Date(item.dueDate), "MMM d, yyyy")}
                    </span>
                  )}
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onDelete(meetingId, item.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4 text-gray-400 hover:text-destructive" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
            No action items yet
          </div>
        )}
      </div>

      <div className="pt-2 space-y-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new action item"
            className="text-sm"
          />
          <Button 
            type="button" 
            size="icon" 
            onClick={handleAddActionItem}
            disabled={!newTask.trim()}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add</span>
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Input
            value={newAssignee}
            onChange={(e) => setNewAssignee(e.target.value)}
            placeholder="Assignee (optional)"
            className="text-sm"
          />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal text-sm",
                  !selectedDueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDueDate ? format(selectedDueDate, "MMM d") : <span>Due date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDueDate}
                onSelect={setSelectedDueDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default MeetingActionItems;
