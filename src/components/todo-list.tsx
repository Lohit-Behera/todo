"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/redux/store";
import TodoItem from "@/components/todo-item";
import type { Todo } from "@/lib/redux/todosSlice";
import { uncheckAllTodos } from "@/lib/redux/todosSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";
import { toast } from "sonner";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const handleUncheckAll = () => {
    dispatch(uncheckAllTodos());
    toast.success("All todos have been unchecked");
  };

  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6 text-center">
            <CardDescription>
              No todos yet. Create one to get started!
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleUncheckAll}
          variant="secondary"
          size="sm"
          className="gap-2"
          disabled={!hasCompletedTodos}
        >
          <CheckSquare className="h-4 w-4" />
          Uncheck All
        </Button>
      </div>

      <AnimatePresence>
        {todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            startTime={todo.startTime}
            endTime={todo.endTime}
            priority={todo.priority || "medium"}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
