import React, { useState } from 'react';
import { useTracker } from '@/context/TrackerContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, List, Plus } from 'lucide-react';
import MeetingDialog from '@/components/meetings/MeetingDialog';
import MeetingCard from '@/components/meetings/MeetingCard';
import MeetingCalendar from '@/components/meetings/MeetingCalendar';
import { Meeting } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';

const MeetingsSection: React.FC = () => {
  const { data, addMeeting, updateMeeting, deleteMeeting, addMeetingActionItem, updateMeetingActionItem, deleteMeetingActionItem } = useTracker();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  
  // Sort meetings by date (newest first)
  const sortedMeetings = [...data.meetings].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateB.getTime() - dateA.getTime();
  });
  
  const selectedMeeting = sortedMeetings.find(m => m.id === selectedMeetingId);
  
  const handleAddMeeting = (formData: Record<string, any>) => {
    addMeeting({
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
  
  const handleSelectMeeting = (meetingId: string) => {
    setSelectedMeetingId(meetingId);
    if (isMobile) {
      setView('list');
    }
  };
  
  const groupMeetingsByDate = (meetings: Meeting[]) => {
    const groups: {[key: string]: Meeting[]} = {};
    
    meetings.forEach(meeting => {
      const date = format(new Date(meeting.date), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(meeting);
    });
    
    // Sort meetings within each group by start time
    Object.keys(groups).forEach(date => {
      groups[date].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
    
    return groups;
  };
  
  const meetingsByDate = groupMeetingsByDate(sortedMeetings);
  const groupDates = Object.keys(meetingsByDate).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meetings</h2>
        <div className="flex items-center gap-2">
          {isMobile && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                className={view === 'calendar' ? 'bg-secondary' : ''}
                onClick={() => setView('calendar')}
              >
                <CalendarIcon className="h-4 w-4" />
                <span className="sr-only">Calendar View</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={view === 'list' ? 'bg-secondary' : ''}
                onClick={() => setView('list')}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
              </Button>
            </div>
          )}
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            New Meeting
          </Button>
        </div>
      </div>

      {isMobile ? (
        <div className={view === 'calendar' ? 'block' : 'hidden'}>
          <MeetingCalendar 
            meetings={data.meetings} 
            onAddMeeting={addMeeting} 
            onSelectMeeting={handleSelectMeeting} 
          />
        </div>
      ) : (
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList>
            <TabsTrigger value="calendar" className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              Calendar View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center">
              <List className="h-4 w-4 mr-1" />
              List View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <MeetingCalendar 
              meetings={data.meetings} 
              onAddMeeting={addMeeting} 
              onSelectMeeting={handleSelectMeeting} 
            />
          </TabsContent>
          
          <TabsContent value="list">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              <div className="col-span-1 lg:col-span-3">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    {groupDates.length > 0 ? (
                      groupDates.map(date => (
                        <div key={date}>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                          </h3>
                          <div className="space-y-2">
                            {meetingsByDate[date].map(meeting => (
                              <div 
                                key={meeting.id} 
                                className={`p-3 rounded-md border transition-colors cursor-pointer ${
                                  selectedMeetingId === meeting.id 
                                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                                onClick={() => setSelectedMeetingId(meeting.id)}
                              >
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium">{meeting.title}</h4>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {meeting.startTime} - {meeting.endTime}
                                  </span>
                                </div>
                                {meeting.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{meeting.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No meetings scheduled. Click "New Meeting" to add one.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="col-span-1 lg:col-span-4 min-h-[200px]">
                {selectedMeeting ? (
                  <MeetingCard
                    meeting={selectedMeeting}
                    onUpdate={updateMeeting}
                    onDelete={(id) => {
                      deleteMeeting(id);
                      setSelectedMeetingId(null);
                    }}
                    onAddActionItem={addMeetingActionItem}
                    onUpdateActionItem={updateMeetingActionItem}
                    onDeleteActionItem={deleteMeetingActionItem}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-8 text-center text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <div>
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <h3 className="mb-1 text-lg font-medium">No meeting selected</h3>
                      <p>Select a meeting from the list to view its details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      {isMobile && view === 'list' && (
        <div className="space-y-4">
          {selectedMeeting ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setSelectedMeetingId(null)}>
                ← Back to list
              </Button>
              <MeetingCard
                meeting={selectedMeeting}
                onUpdate={updateMeeting}
                onDelete={(id) => {
                  deleteMeeting(id);
                  setSelectedMeetingId(null);
                }}
                onAddActionItem={addMeetingActionItem}
                onUpdateActionItem={updateMeetingActionItem}
                onDeleteActionItem={deleteMeetingActionItem}
              />
            </>
          ) : (
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {groupDates.length > 0 ? (
                  groupDates.map(date => (
                    <div key={date}>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        {format(new Date(date), 'EEEE, MMMM d, yyyy')}
                      </h3>
                      <div className="space-y-2">
                        {meetingsByDate[date].map(meeting => (
                          <div 
                            key={meeting.id} 
                            className="p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                            onClick={() => setSelectedMeetingId(meeting.id)}
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">{meeting.title}</h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {meeting.startTime} - {meeting.endTime}
                              </span>
                            </div>
                            {meeting.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{meeting.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No meetings scheduled. Click "New Meeting" to add one.
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      )}
      
      <MeetingDialog
        title="Add New Meeting"
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddMeeting}
      />
    </div>
  );
};

export default MeetingsSection;