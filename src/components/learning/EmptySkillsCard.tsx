
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";

const EmptySkillsCard: React.FC = () => {
  return (
    <Card className="col-span-full dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700">
      <CardContent className="pt-6 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-40">
        <Book className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-3" />
        <p>No skills added yet. Click "Add Skill" to get started!</p>
      </CardContent>
    </Card>
  );
};

export default EmptySkillsCard;
