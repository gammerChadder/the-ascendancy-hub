
import React, { useState } from "react";
import { useTracker } from "@/context/TrackerContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddItemDialog from "../ui-components/AddItemDialog";
import { 
  Video,
  Trash2, 
  Plus, 
  Edit,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ContentCreationSection: React.FC = () => {
  const { data, addContentIdea, updateContentIdea, deleteContentIdea } = useTracker();
  const [isAddIdeaOpen, setIsAddIdeaOpen] = useState(false);

  const handleAddIdea = (formData: Record<string, any>) => {
    addContentIdea({
      title: formData.title,
      description: formData.description,
      platform: formData.platform,
      status: "idea",
    });
  };

  const handleStatusChange = (ideaId: string, status: "idea" | "draft" | "published") => {
    updateContentIdea(ideaId, { status });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "idea":
        return <Badge variant="outline" className="text-gray-500 border-gray-300">Idea</Badge>;
      case "draft":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">Draft</Badge>;
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Content Creation</h2>
        <Button onClick={() => setIsAddIdeaOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add Content Idea
        </Button>
      </div>

      <AddItemDialog
        title="Add Content Idea"
        isOpen={isAddIdeaOpen}
        onClose={() => setIsAddIdeaOpen(false)}
        onSubmit={handleAddIdea}
        fields={[
          { name: "title", label: "Title", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
          { name: "platform", label: "Platform", type: "text", placeholder: "e.g., Blog, YouTube, Instagram" }
        ]}
      />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Video className="mr-2 h-5 w-5 text-brand-500" />
            Content Ideas
          </CardTitle>
          <p className="text-sm text-gray-500">Track your content ideas and their status</p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px] pr-4">
            {data.contentCreation.length > 0 ? (
              <div className="space-y-4">
                {data.contentCreation.map((idea) => (
                  <div key={idea.id} className="border border-gray-100 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-gray-800 pr-3">{idea.title}</h3>
                          <div className="flex space-x-2 items-center">
                            {getStatusBadge(idea.status)}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteContentIdea(idea.id)}
                              className="opacity-50 hover:opacity-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {idea.description && (
                          <p className="text-sm text-gray-600 mb-2">{idea.description}</p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                          {idea.platform && (
                            <Badge variant="outline" className="text-xs mr-auto">
                              {idea.platform}
                            </Badge>
                          )}
                          <Select 
                            defaultValue={idea.status} 
                            onValueChange={(value) => handleStatusChange(idea.id, value as "idea" | "draft" | "published")}
                          >
                            <SelectTrigger className="w-[140px] h-8 text-xs ml-auto">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="idea">Idea</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No content ideas added yet. Click "Add Content Idea" to get started!
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreationSection;
