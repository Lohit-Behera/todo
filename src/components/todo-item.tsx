"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, updateTodo, deleteTodo } from "@/lib/redux/todosSlice";
import type { Priority } from "@/lib/redux/todosSlice";
import { Edit, Trash, Check, X, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  startTime: string;
  endTime: string;
  priority: Priority;
}

export default function TodoItem({
  id,
  text,
  completed,
  startTime,
  endTime,
  priority,
}: TodoItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [editStartTime, setEditStartTime] = useState(startTime);
  const [editEndTime, setEditEndTime] = useState(endTime);
  const [editPriority, setEditPriority] = useState<Priority>(priority);

  const handleToggle = () => {
    dispatch(toggleTodo({ id }));
    toast.success(
      `Todo marked as ${completed ? "not completed" : "completed"}`
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo({ id }));
    toast.error("Todo deleted");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(text);
    setEditStartTime(startTime);
    setEditEndTime(endTime);
    setEditPriority(priority);
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(
        updateTodo({
          id,
          text: editText,
          startTime: editStartTime,
          endTime: editEndTime,
          priority: editPriority,
        })
      );
      setIsEditing(false);
      toast.success("Todo updated successfully");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(text);
    setEditStartTime(startTime);
    setEditEndTime(endTime);
    setEditPriority(priority);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="bg-card/50 backdrop-blur-lg">
        <CardContent className="pt-6">
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`edit-text-${id}`}>Todo</Label>
                <Input
                  id={`edit-text-${id}`}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor={`edit-start-time-${id}`}>Start Time</Label>
                  <Input
                    id={`edit-start-time-${id}`}
                    type="time"
                    value={editStartTime}
                    onChange={(e) => setEditStartTime(e.target.value)}
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor={`edit-end-time-${id}`}>End Time</Label>
                  <Input
                    id={`edit-end-time-${id}`}
                    type="time"
                    value={editEndTime}
                    onChange={(e) => setEditEndTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`edit-priority-${id}`}>Priority</Label>
                <Select
                  value={editPriority}
                  onValueChange={(value: Priority) => setEditPriority(value)}
                >
                  <SelectTrigger id={`edit-priority-${id}`}>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="mr-1 h-4 w-4" /> Cancel
                </Button>
                <Button onClick={handleSave} variant="default" size="sm">
                  <Check className="mr-1 h-4 w-4" /> Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`todo-${id}`}
                  checked={completed}
                  onCheckedChange={handleToggle}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`todo-${id}`}
                      className={`text-base ${
                        completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : ""
                      }`}
                    >
                      {text}
                    </label>
                    <Badge variant={getPriorityColor(priority)}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Badge>
                  </div>

                  {(startTime || endTime) && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span>
                        {startTime && `${startTime}`}
                        {startTime && endTime && " - "}
                        {endTime && `${endTime}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        {!isEditing && (
          <CardFooter className="flex justify-end gap-2 pt-0">
            <Button variant="outline" size="icon" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleDelete}>
              <Trash className="h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
