"use client";

import TodoList from "@/components/todo-list";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Todo List
      </motion.h1>
      <TodoList />
    </div>
  );
}
