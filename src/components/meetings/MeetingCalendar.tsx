import React, { useState } from 'react';
import { Meeting } from '@/types';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { format, isSameDay, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MeetingDialog from './MeetingDialog';
import { Plus } from 'lucide-react';
import { DayContent, DayContentProps } from 'react-day-picker';

interface MeetingCalendarProps {
  meetings: Meeting[];
  onAddMeeting: (meeting: Omit<Meeting, "id" | "createdAt">) => void;
  onSelectMeeting: (meetingId: string) => void;
}

const MeetingCalendar: React.FC<MeetingCalendarProps> = ({
  meetings,
  onAddMeeting,
  onSelectMeeting
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Function to determine if a day has meetings
  const hasMeetings = (date: Date): boolean => {
    return meetings.some(meeting => {
      const meetingDate = parseISO(meeting.date);
      return isSameDay(date, meetingDate);
    });
  };

  // Correctly implemented custom day renderer
  const renderDay = (props: DayContentProps) => {
    const hasEvents = props.date ? hasMeetings(props.date) : false;
    
    return (
      <div className={cn("relative", hasEvents && "has-events")}>
        <DayContent {...props} />
        {hasEvents && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-[3px]">
            <div className="h-1 w-1 rounded-full bg-primary" />
          </div>
        )}
      </div>
    );
  };

  const handleAddNewMeeting = (formData: Record<string, any>) => {
    onAddMeeting({
      title: formData.title,
      description: formData.description,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      attendees: formData.attendees?.split(',').map((a: string) => a.trim()).filter(Boolean) || [],
      preparation: formData.preparation?.split('\n').filter(Boolean) || [],
      notes: formData.notes,
      mom: formData.mom,
      actionItems: [],
    });
    setIsAddDialogOpen(false);
  };

  // Filter meetings for the selected date
  const meetingsOnSelectedDate = selectedDate 
    ? meetings.filter(meeting => isSameDay(parseISO(meeting.date), selectedDate))
    : [];

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <Card className="p-4 max-w-full md:max-w-xs bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Calendar</h3>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            New Meeting
          </Button>
        </div>
        <Calendar 
          mode="single" 
          selected={selectedDate} 
          onSelect={setSelectedDate}
          className="rounded-md border border-gray-200 dark:border-gray-700 p-3 pointer-events-auto"
          modifiers={{
            hasMeetings: (date) => hasMeetings(date)
          }}
          modifiersStyles={{
            hasMeetings: {
              fontWeight: 'bold'
            }
          }}
          components={{
            DayContent: (props) => renderDay(props)
          }}
        />
      </Card>
      
      <Card className="flex-1 p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="font-medium mb-4">
          {selectedDate ? (
            <>Meetings for {format(selectedDate, 'EEEE, MMMM d, yyyy')}</>
          ) : (
            <>Select a date to view meetings</>
          )}
        </h3>
        
        <div className="space-y-2">
          {meetingsOnSelectedDate.length > 0 ? (
            meetingsOnSelectedDate
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map(meeting => (
                <button
                  key={meeting.id}
                  onClick={() => onSelectMeeting(meeting.id)}
                  className="w-full text-left p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{meeting.title}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {meeting.startTime} - {meeting.endTime}
                    </span>
                  </div>
                  {meeting.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">{meeting.description}</p>
                  )}
                </button>
              ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {selectedDate ? (
                <>No meetings scheduled for this day.</>
              ) : (
                <>Select a date to view meetings.</>
              )}
            </div>
          )}
        </div>
      </Card>
      
      <MeetingDialog
        title="Add New Meeting"
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddNewMeeting}
        defaultValues={{
          date: selectedDate?.toISOString(),
        }}
      />
    </div>
  );
};

export default MeetingCalendar;