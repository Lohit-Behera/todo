"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, updateTodo, deleteTodo } from "@/lib/redux/todosSlice";
import type { Priority, TimeMode } from "@/lib/redux/todosSlice";
import { Edit, Trash, Check, X, Clock, Timer } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  timeMode: TimeMode;
  startTime: string;
  endTime: string;
  durationHours: string;
  durationMinutes: string;
  priority: Priority;
}

export default function TodoItem({
  id,
  text,
  completed,
  timeMode,
  startTime,
  endTime,
  durationHours,
  durationMinutes,
  priority,
}: TodoItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [editTimeMode, setEditTimeMode] = useState<TimeMode>(
    timeMode || "specific"
  );

  // Parse start time
  const startHour = startTime ? startTime.split(":")[0] : "00";
  const startMinute = startTime ? startTime.split(":")[1] : "00";
  const [editStartHour, setEditStartHour] = useState(startHour);
  const [editStartMinute, setEditStartMinute] = useState(startMinute);

  // Parse end time
  const endHour = endTime ? endTime.split(":")[0] : "00";
  const endMinute = endTime ? endTime.split(":")[1] : "00";
  const [editEndHour, setEditEndHour] = useState(endHour);
  const [editEndMinute, setEditEndMinute] = useState(endMinute);

  // Duration
  const [editDurationHours, setEditDurationHours] = useState(
    durationHours || "00"
  );
  const [editDurationMinutes, setEditDurationMinutes] = useState(
    durationMinutes || "00"
  );

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
    setEditTimeMode(timeMode || "specific");
    setEditStartHour(startHour);
    setEditStartMinute(startMinute);
    setEditEndHour(endHour);
    setEditEndMinute(endMinute);
    setEditDurationHours(durationHours || "00");
    setEditDurationMinutes(durationMinutes || "00");
    setEditPriority(priority);
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(
        updateTodo({
          id,
          text: editText,
          timeMode: editTimeMode,
          startTime: `${editStartHour}:${editStartMinute}`,
          endTime: `${editEndHour}:${editEndMinute}`,
          durationHours: editDurationHours,
          durationMinutes: editDurationMinutes,
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
    setEditTimeMode(timeMode || "specific");
    setEditStartHour(startHour);
    setEditStartMinute(startMinute);
    setEditEndHour(endHour);
    setEditEndMinute(endMinute);
    setEditDurationHours(durationHours || "00");
    setEditDurationMinutes(durationMinutes || "00");
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

              <Tabs
                defaultValue={editTimeMode}
                onValueChange={(value) => setEditTimeMode(value as TimeMode)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="specific">Specific Times</TabsTrigger>
                  <TabsTrigger value="duration">Duration</TabsTrigger>
                </TabsList>

                <TabsContent value="specific" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Time</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`edit-start-hour-${id}`}>Hour</Label>
                          <Select
                            value={editStartHour}
                            onValueChange={setEditStartHour}
                          >
                            <SelectTrigger
                              id={`edit-start-hour-${id}`}
                              aria-label="Hour"
                              className="w-full"
                            >
                              <SelectValue placeholder="Hour" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => i).map(
                                (hour) => (
                                  <SelectItem
                                    key={`start-hour-${hour}`}
                                    value={hour < 10 ? `0${hour}` : `${hour}`}
                                  >
                                    {hour < 10 ? `0${hour}` : hour}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edit-start-minute-${id}`}>
                            Minute
                          </Label>
                          <Select
                            value={editStartMinute}
                            onValueChange={setEditStartMinute}
                          >
                            <SelectTrigger
                              id={`edit-start-minute-${id}`}
                              aria-label="Minute"
                              className="w-full"
                            >
                              <SelectValue placeholder="Minute" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 60 }, (_, i) => i).map(
                                (minute) => (
                                  <SelectItem
                                    key={`start-minute-${minute}`}
                                    value={
                                      minute < 10 ? `0${minute}` : `${minute}`
                                    }
                                  >
                                    {minute < 10 ? `0${minute}` : minute}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>End Time</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`edit-end-hour-${id}`}>Hour</Label>
                          <Select
                            value={editEndHour}
                            onValueChange={setEditEndHour}
                          >
                            <SelectTrigger
                              id={`edit-end-hour-${id}`}
                              aria-label="Hour"
                              className="w-full"
                            >
                              <SelectValue placeholder="Hour" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => i).map(
                                (hour) => (
                                  <SelectItem
                                    key={`end-hour-${hour}`}
                                    value={hour < 10 ? `0${hour}` : `${hour}`}
                                  >
                                    {hour < 10 ? `0${hour}` : hour}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`edit-end-minute-${id}`}>
                            Minute
                          </Label>
                          <Select
                            value={editEndMinute}
                            onValueChange={setEditEndMinute}
                          >
                            <SelectTrigger
                              id={`edit-end-minute-${id}`}
                              aria-label="Minute"
                              className="w-full"
                            >
                              <SelectValue placeholder="Minute" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 60 }, (_, i) => i).map(
                                (minute) => (
                                  <SelectItem
                                    key={`end-minute-${minute}`}
                                    value={
                                      minute < 10 ? `0${minute}` : `${minute}`
                                    }
                                  >
                                    {minute < 10 ? `0${minute}` : minute}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="duration" className="space-y-4">
                  <div>
                    <Label>Time to Complete</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="space-y-2">
                        <Label htmlFor={`edit-duration-hours-${id}`}>
                          Hours
                        </Label>
                        <Select
                          value={editDurationHours}
                          onValueChange={setEditDurationHours}
                        >
                          <SelectTrigger
                            id={`edit-duration-hours-${id}`}
                            aria-label="Hours"
                            className="w-full"
                          >
                            <SelectValue placeholder="Hours" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => i).map(
                              (hour) => (
                                <SelectItem
                                  key={`duration-hour-${hour}`}
                                  value={hour < 10 ? `0${hour}` : `${hour}`}
                                >
                                  {hour < 10 ? `0${hour}` : hour}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edit-duration-minutes-${id}`}>
                          Minutes
                        </Label>
                        <Select
                          value={editDurationMinutes}
                          onValueChange={setEditDurationMinutes}
                        >
                          <SelectTrigger
                            id={`edit-duration-minutes-${id}`}
                            aria-label="Minutes"
                            className="w-full"
                          >
                            <SelectValue placeholder="Minutes" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 60 }, (_, i) => i).map(
                              (minute) => (
                                <SelectItem
                                  key={`duration-minute-${minute}`}
                                  value={
                                    minute < 10 ? `0${minute}` : `${minute}`
                                  }
                                >
                                  {minute < 10 ? `0${minute}` : minute}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor={`edit-priority-${id}`}>Priority</Label>
                <Select
                  value={editPriority}
                  onValueChange={(value: Priority) => setEditPriority(value)}
                >
                  <SelectTrigger
                    id={`edit-priority-${id}`}
                    className="w-[180px]"
                  >
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

                  {timeMode === "specific" && (startTime || endTime) ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={14} />
                      <span>
                        {startTime && `${startTime}`}
                        {startTime && endTime && " - "}
                        {endTime && `${endTime}`}
                      </span>
                    </div>
                  ) : timeMode === "duration" &&
                    (durationHours !== "00" || durationMinutes !== "00") ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Timer size={14} />
                      <span>
                        {durationHours !== "00" &&
                          `${Number.parseInt(durationHours)}h`}
                        {durationHours !== "00" &&
                          durationMinutes !== "00" &&
                          " "}
                        {durationMinutes !== "00" &&
                          `${Number.parseInt(durationMinutes)}m`}
                      </span>
                    </div>
                  ) : null}
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
