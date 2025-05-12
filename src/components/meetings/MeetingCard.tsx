
import React, { useState } from 'react';
import { format } from "date-fns";
import { Meeting } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Users, 
  ListChecks, 
  FileText, 
  Trash2, 
  Edit, 
  Check, 
  Plus 
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MeetingActionItems from "./MeetingActionItems";
import MeetingDialog from "./MeetingDialog";

interface MeetingCardProps {
  meeting: Meeting;
  onUpdate: (meetingId: string, updates: Partial<Meeting>) => void;
  onDelete: (meetingId: string) => void;
  onAddActionItem: (meetingId: string, actionItem: Omit<Meeting["actionItems"][0], "id">) => void;
  onUpdateActionItem: (meetingId: string, actionItemId: string, updates: Partial<Omit<Meeting["actionItems"][0], "id">>) => void;
  onDeleteActionItem: (meetingId: string, actionItemId: string) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  meeting,
  onUpdate,
  onDelete,
  onAddActionItem,
  onUpdateActionItem,
  onDeleteActionItem
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const handleEditSubmit = (formData: Record<string, any>) => {
    onUpdate(meeting.id, {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      attendees: formData.attendees?.split(',').map((a: string) => a.trim()),
      preparation: formData.preparation?.split('\n').filter(Boolean),
      notes: formData.notes,
      mom: formData.mom,
    });
    setIsEditDialogOpen(false);
  };
  
  const completedItems = meeting.actionItems?.filter(item => item.completed).length || 0;
  const totalItems = meeting.actionItems?.length || 0;

  return (
    <>
      <Card className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{meeting.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(meeting.date), "EEEE, MMMM d, yyyy")}</span>
              </CardDescription>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{meeting.startTime} - {meeting.endTime}</span>
                </div>
                {meeting.attendees && meeting.attendees.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{meeting.attendees.length} attendees</span>
                  </div>
                )}
                {totalItems > 0 && (
                  <Badge variant={completedItems === totalItems ? "default" : "outline"} className="flex items-center gap-1">
                    <ListChecks className="h-3 w-3" />
                    <span>{completedItems}/{totalItems} tasks</span>
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(meeting.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Accordion type="single" collapsible className="w-full">
            {meeting.description && (
              <AccordionItem value="description" className="border-b-0">
                <AccordionTrigger className="py-2 text-sm font-medium">Description</AccordionTrigger>
                <AccordionContent className="text-sm">
                  <p className="text-gray-600 dark:text-gray-300">{meeting.description}</p>
                </AccordionContent>
              </AccordionItem>
            )}
            
            {meeting.preparation && meeting.preparation.length > 0 && (
              <AccordionItem value="preparation" className="border-b-0">
                <AccordionTrigger className="py-2 text-sm font-medium">Preparation</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {meeting.preparation.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300">{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
            
            {meeting.notes && (
              <AccordionItem value="notes" className="border-b-0">
                <AccordionTrigger className="py-2 text-sm font-medium">Notes</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm whitespace-pre-wrap text-gray-600 dark:text-gray-300">{meeting.notes}</div>
                </AccordionContent>
              </AccordionItem>
            )}
            
            {meeting.mom && (
              <AccordionItem value="mom" className="border-b-0">
                <AccordionTrigger className="py-2 text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>Minutes of Meeting</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm whitespace-pre-wrap text-gray-600 dark:text-gray-300">{meeting.mom}</div>
                </AccordionContent>
              </AccordionItem>
            )}
            
            <AccordionItem value="action-items" className="border-b-0">
              <AccordionTrigger className="py-2 text-sm font-medium">
                <div className="flex items-center gap-1">
                  <ListChecks className="h-4 w-4" />
                  <span>Action Items {totalItems > 0 && `(${completedItems}/${totalItems})`}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <MeetingActionItems
                  meetingId={meeting.id}
                  actionItems={meeting.actionItems || []}
                  onAdd={onAddActionItem}
                  onUpdate={onUpdateActionItem}
                  onDelete={onDeleteActionItem}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <MeetingDialog
        title="Edit Meeting"
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
        defaultValues={{
          title: meeting.title,
          description: meeting.description || "",
          date: meeting.date,
          startTime: meeting.startTime,
          endTime: meeting.endTime,
          attendees: meeting.attendees?.join(", ") || "",
          preparation: meeting.preparation?.join("\n") || "",
          notes: meeting.notes || "",
          mom: meeting.mom || "",
        }}
      />
    </>
  );
};

export default MeetingCard;
