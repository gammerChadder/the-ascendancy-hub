
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, Plus, Trash2 } from "lucide-react";
import { Resource } from "@/types";

interface ResourcesSectionProps {
  skillId: string;
  resources: Resource[];
  onAddResource: (id: string) => void;
  onDeleteResource: (skillId: string, resourceId: string) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  skillId,
  resources,
  onAddResource,
  onDeleteResource
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-sm dark:text-gray-300">Resources</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onAddResource(skillId)}
          className="text-xs"
        >
          <Plus size={14} className="mr-1" /> Add
        </Button>
      </div>
      
      <ScrollArea className="h-36 rounded-md border border-gray-100 dark:border-gray-700 p-1">
        {resources.length > 0 ? (
          <div className="space-y-2 p-1">
            {resources.map((resource) => (
              <div 
                key={resource.id} 
                className="flex justify-between items-start p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-100 dark:border-gray-700"
              >
                <div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand-600 dark:text-brand-400 flex items-center hover:underline"
                  >
                    <Link size={12} className="mr-1 flex-shrink-0" />
                    {resource.title}
                  </a>
                  {resource.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{resource.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-2"
                  onClick={() => onDeleteResource(skillId, resource.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center p-4">No resources added</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default ResourcesSection;
