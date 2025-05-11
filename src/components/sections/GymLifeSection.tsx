
import React, { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddItemDialog from "../ui-components/AddItemDialog";
import { 
  Dumbbell, 
  Calendar, 
  Trash2, 
  Plus, 
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

const GymLifeSection: React.FC = () => {
  const { data, addGymEntry, deleteGymEntry } = useTracker();
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);

  const handleAddEntry = (formData: Record<string, any>) => {
    addGymEntry({
      activity: formData.activity,
      duration: formData.duration ? Number(formData.duration) : undefined,
      notes: formData.notes,
      date: formData.date || new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gym & Life</h2>
        <Button onClick={() => setIsAddEntryOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add Entry
        </Button>
      </div>

      <AddItemDialog
        title="Add Gym Entry"
        isOpen={isAddEntryOpen}
        onClose={() => setIsAddEntryOpen(false)}
        onSubmit={handleAddEntry}
        fields={[
          { name: "activity", label: "Activity", type: "text", required: true, placeholder: "e.g., Running, Weight Training" },
          { name: "duration", label: "Duration (minutes)", type: "number" },
          { name: "date", label: "Date", type: "date" },
          { name: "notes", label: "Notes", type: "textarea" }
        ]}
      />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Dumbbell className="mr-2 h-5 w-5 text-brand-500" />
            Fitness Journal
          </CardTitle>
          <p className="text-sm text-gray-500">Track your gym activities and life events</p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px] pr-4">
            {data.gymLife.length > 0 ? (
              <div className="divide-y">
                {data.gymLife.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry) => (
                  <div key={entry.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                          <span className="text-xs text-gray-500">{format(new Date(entry.date), "PPP")}</span>
                        </div>
                        <h3 className="font-medium text-gray-800">{entry.activity}</h3>
                        {entry.duration && (
                          <p className="text-sm text-gray-500 mt-1">Duration: {entry.duration} minutes</p>
                        )}
                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteGymEntry(entry.id)}
                        className="opacity-50 hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No gym entries added yet. Click "Add Entry" to get started!
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default GymLifeSection;
