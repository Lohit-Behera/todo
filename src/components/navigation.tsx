"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ListTodo, PlusCircle } from "lucide-react";
import dynamic from "next/dynamic";
const ModeToggle = dynamic(
  () => import("@/components/mode-toggle").then((mod) => mod.ModeToggle),
  {
    ssr: false,
  }
);

export default function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="border-b bg-background/40 backdrop-blur-lg p-4 w-full"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant={pathname === "/" ? "default" : "outline"}
              className="gap-2"
            >
              <ListTodo className="h-4 w-4" />
              Todo List
            </Button>
          </Link>
          <Link href="/create">
            <Button
              variant={pathname === "/create" ? "default" : "outline"}
              className="gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Create Todo
            </Button>
          </Link>
        </div>
        <ModeToggle />
      </div>
    </motion.nav>
  );
}
