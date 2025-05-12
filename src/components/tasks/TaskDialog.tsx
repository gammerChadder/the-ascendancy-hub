
import React from "react";
import AddItemDialog from "../ui-components/AddItemDialog";

interface TaskDialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Record<string, any>) => void;
  isLongTerm?: boolean;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ 
  title, 
  isOpen, 
  onClose, 
  onSubmit,
  isLongTerm = false 
}) => {
  const fieldLabel = isLongTerm ? "Plan Title" : "Task Title";
  const dateLabel = isLongTerm ? "Target Date" : "Due Date";
  
  return (
    <AddItemDialog
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      fields={[
        { name: "title", label: fieldLabel, type: "text", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "dueDate", label: dateLabel, type: "date" }
      ]}
    />
  );
};

export default TaskDialog;
