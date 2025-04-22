"use client";

import type React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addTodo } from "@/lib/redux/todosSlice";
import type { Priority } from "@/lib/redux/todosSlice";
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

export default function CreateTodo() {
  const [text, setText] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [priority, setPriority] = useState<Priority>("medium");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      dispatch(
        addTodo({
          text: text.trim(),
          startTime,
          endTime,
          priority,
        })
      );
      toast.success("Todo added successfully!");
      setText("");
      setStartTime("");
      setEndTime("");
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
                className=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-4">
                <Label>Start Time</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-hour">Hour</Label>
                    <Select
                      value={startTime.split(":")[0] || ""}
                      onValueChange={(value) => {
                        const minute = startTime.split(":")[1] || "00";
                        setStartTime(`${value}:${minute}`);
                      }}
                    >
                      <SelectTrigger
                        id="start-hour"
                        aria-label="Hour"
                        className="w-full"
                      >
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem
                            key={`start-hour-${hour}`}
                            value={hour < 10 ? `0${hour}` : `${hour}`}
                          >
                            {hour < 10 ? `0${hour}` : hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-minute">Minute</Label>
                    <Select
                      value={startTime.split(":")[1] || ""}
                      onValueChange={(value) => {
                        const hour = startTime.split(":")[0] || "00";
                        setStartTime(`${hour}:${value}`);
                      }}
                    >
                      <SelectTrigger
                        id="start-minute"
                        aria-label="Minute"
                        className="w-full"
                      >
                        <SelectValue placeholder="Minute" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Array.from({ length: 60 }, (_, i) => i).map(
                          (minute) => (
                            <SelectItem
                              key={`start-minute-${minute}`}
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
              <div className="grid gap-4">
                <Label>End Time</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="end-hour">Hour</Label>
                    <Select
                      value={endTime.split(":")[0] || ""}
                      onValueChange={(value) => {
                        const minute = endTime.split(":")[1] || "00";
                        setEndTime(`${value}:${minute}`);
                      }}
                    >
                      <SelectTrigger
                        id="end-hour"
                        aria-label="Hour"
                        className="w-full"
                      >
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem
                            key={`end-hour-${hour}`}
                            value={hour < 10 ? `0${hour}` : `${hour}`}
                          >
                            {hour < 10 ? `0${hour}` : hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-minute">Minute</Label>
                    <Select
                      value={endTime.split(":")[1] || ""}
                      onValueChange={(value) => {
                        const hour = endTime.split(":")[0] || "00";
                        setEndTime(`${hour}:${value}`);
                      }}
                    >
                      <SelectTrigger
                        id="end-minute"
                        aria-label="Minute"
                        className="w-full"
                      >
                        <SelectValue placeholder="Minute" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Array.from({ length: 60 }, (_, i) => i).map(
                          (minute) => (
                            <SelectItem
                              key={`end-minute-${minute}`}
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
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={priority}
                onValueChange={(value: Priority) => setPriority(value)}
              >
                <SelectTrigger id="priority" className="min-w-[180px]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="min-w-[180px]">
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
