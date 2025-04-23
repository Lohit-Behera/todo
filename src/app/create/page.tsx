"use client";

import type React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addTodo } from "@/lib/redux/todosSlice";
import type { Priority, TimeMode } from "@/lib/redux/todosSlice";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateTodo() {
  const [text, setText] = useState("");
  const [timeMode, setTimeMode] = useState<TimeMode>("specific");

  // Specific time fields
  const [startHour, setStartHour] = useState("00");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("00");
  const [endMinute, setEndMinute] = useState("00");

  // Duration fields
  const [durationHours, setDurationHours] = useState("00");
  const [durationMinutes, setDurationMinutes] = useState("00");

  const [priority, setPriority] = useState<Priority>("medium");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      dispatch(
        addTodo({
          text: text.trim(),
          timeMode,
          startTime: `${startHour}:${startMinute}`,
          endTime: `${endHour}:${endMinute}`,
          durationHours,
          durationMinutes,
          priority,
        })
      );
      toast.success("Todo added successfully!");
      setText("");
      setStartHour("00");
      setStartMinute("00");
      setEndHour("00");
      setEndMinute("00");
      setDurationHours("00");
      setDurationMinutes("00");
      setPriority("medium");
      router.push("/");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-center">Create New Todo</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="todo-text">Todo Description</Label>
              <Input
                id="todo-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                required
              />
            </div>

            <Tabs
              defaultValue="specific"
              onValueChange={(value) => setTimeMode(value as TimeMode)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="specific">Specific Times</TabsTrigger>
                <TabsTrigger value="duration">Duration</TabsTrigger>
              </TabsList>

              <TabsContent value="specific" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-4">
                    <Label>Start Time</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="start-hour">Hour</Label>
                        <Select value={startHour} onValueChange={setStartHour}>
                          <SelectTrigger
                            id="start-hour"
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
                        <Label htmlFor="start-minute">Minute</Label>
                        <Select
                          value={startMinute}
                          onValueChange={setStartMinute}
                        >
                          <SelectTrigger
                            id="start-minute"
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
                  <div className="grid gap-4">
                    <Label>End Time</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="end-hour">Hour</Label>
                        <Select value={endHour} onValueChange={setEndHour}>
                          <SelectTrigger
                            id="end-hour"
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
                        <Label htmlFor="end-minute">Minute</Label>
                        <Select value={endMinute} onValueChange={setEndMinute}>
                          <SelectTrigger
                            id="end-minute"
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
                      <Label htmlFor="duration-hours">Hours</Label>
                      <Select
                        value={durationHours}
                        onValueChange={setDurationHours}
                      >
                        <SelectTrigger
                          id="duration-hours"
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
                      <Label htmlFor="duration-minutes">Minutes</Label>
                      <Select
                        value={durationMinutes}
                        onValueChange={setDurationMinutes}
                      >
                        <SelectTrigger
                          id="duration-minutes"
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
                                value={minute < 10 ? `0${minute}` : `${minute}`}
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
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(value: Priority) => setPriority(value)}
              >
                <SelectTrigger id="priority" className="w-[180px]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full mt-4">
              Add Todo
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
