
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTracker } from "@/context/TrackerContext";
import { Trash, Plus, MoveHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ScrumCardType = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "inProgress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

const ScrumBoardSection: React.FC = () => {
  const { data, addScrumCard, updateScrumCardStatus, deleteScrumCard } = useTracker();
  const [newCard, setNewCard] = useState<Partial<ScrumCardType>>({
    title: "",
    description: "",
    priority: "medium",
  });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const draggedItem = useRef<ScrumCardType | null>(null);

  const handleAddCard = () => {
    if (newCard.title) {
      addScrumCard({
        title: newCard.title,
        description: newCard.description,
        status: "todo",
        priority: newCard.priority as "low" | "medium" | "high",
      });
      setNewCard({ title: "", description: "", priority: "medium" });
      setIsAddingCard(false);
    }
  };

  const handleDragStart = (card: ScrumCardType) => {
    draggedItem.current = card;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: "todo" | "inProgress" | "done") => {
    if (draggedItem.current) {
      updateScrumCardStatus(draggedItem.current.id, status);
      draggedItem.current = null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 hover:bg-red-600";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "low":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Scrum Board</h2>
        <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
          <DialogTrigger asChild>
            <Button className="bg-brand-500 hover:bg-brand-600">
              <Plus className="mr-1 h-4 w-4" /> Add Card
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Card</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Input
                  placeholder="Title"
                  value={newCard.title}
                  onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Description"
                  value={newCard.description}
                  onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <div className="flex space-x-2">
                  {["low", "medium", "high"].map((priority) => (
                    <Button
                      key={priority}
                      type="button"
                      variant={newCard.priority === priority ? "default" : "outline"}
                      onClick={() => setNewCard({ ...newCard, priority: priority as "low" | "medium" | "high" })}
                      className={newCard.priority === priority ? getPriorityColor(priority) : ""}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <Button type="button" onClick={handleAddCard} className="bg-brand-500 hover:bg-brand-600">
                Add Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Todo Column */}
        <div
          className="border rounded-lg p-4 bg-gray-50"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("todo")}
        >
          <h3 className="font-medium text-lg mb-4 flex items-center">
            <Badge className="bg-gray-500 mr-2">Todo</Badge>
            <span>{data.scrumBoard?.filter((card) => card.status === "todo").length || 0}</span>
          </h3>
          <div className="space-y-2">
            {data.scrumBoard
              ?.filter((card) => card.status === "todo")
              .map((card) => (
                <Card
                  key={card.id}
                  className="cursor-move"
                  draggable
                  onDragStart={() => handleDragStart(card)}
                >
                  <CardHeader className="py-2 px-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                      <div className="flex items-center">
                        <Badge className={`${getPriorityColor(card.priority)} mr-2`}>
                          {card.priority}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoveHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateScrumCardStatus(card.id, "inProgress")}>
                              Move to In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateScrumCardStatus(card.id, "done")}>
                              Move to Done
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteScrumCard(card.id)} className="text-red-500">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  {card.description && (
                    <CardContent className="py-1 px-3 text-xs text-gray-600">
                      {card.description}
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div
          className="border rounded-lg p-4 bg-gray-50"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("inProgress")}
        >
          <h3 className="font-medium text-lg mb-4 flex items-center">
            <Badge className="bg-blue-500 mr-2">In Progress</Badge>
            <span>{data.scrumBoard?.filter((card) => card.status === "inProgress").length || 0}</span>
          </h3>
          <div className="space-y-2">
            {data.scrumBoard
              ?.filter((card) => card.status === "inProgress")
              .map((card) => (
                <Card
                  key={card.id}
                  className="cursor-move"
                  draggable
                  onDragStart={() => handleDragStart(card)}
                >
                  <CardHeader className="py-2 px-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                      <div className="flex items-center">
                        <Badge className={`${getPriorityColor(card.priority)} mr-2`}>
                          {card.priority}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoveHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateScrumCardStatus(card.id, "todo")}>
                              Move to Todo
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateScrumCardStatus(card.id, "done")}>
                              Move to Done
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteScrumCard(card.id)} className="text-red-500">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  {card.description && (
                    <CardContent className="py-1 px-3 text-xs text-gray-600">
                      {card.description}
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        </div>

        {/* Done Column */}
        <div
          className="border rounded-lg p-4 bg-gray-50"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("done")}
        >
          <h3 className="font-medium text-lg mb-4 flex items-center">
            <Badge className="bg-green-500 mr-2">Done</Badge>
            <span>{data.scrumBoard?.filter((card) => card.status === "done").length || 0}</span>
          </h3>
          <div className="space-y-2">
            {data.scrumBoard
              ?.filter((card) => card.status === "done")
              .map((card) => (
                <Card
                  key={card.id}
                  className="cursor-move"
                  draggable
                  onDragStart={() => handleDragStart(card)}
                >
                  <CardHeader className="py-2 px-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                      <div className="flex items-center">
                        <Badge className={`${getPriorityColor(card.priority)} mr-2`}>
                          {card.priority}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoveHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateScrumCardStatus(card.id, "todo")}>
                              Move to Todo
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateScrumCardStatus(card.id, "inProgress")}>
                              Move to In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteScrumCard(card.id)} className="text-red-500">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  {card.description && (
                    <CardContent className="py-1 px-3 text-xs text-gray-600">
                      {card.description}
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrumBoardSection;
