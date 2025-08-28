"use client";
import { useState, useEffect } from "react";
import { useTodos } from "@/hooks/useTodos";
import TodoItem from "@/components/layouts/TodoItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const { todos, isLoading, addTodo } = useTodos();
  const [title, setTitle] = useState("");
  const {  status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please login to use the Todo App 🔒");
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  if (isLoading) return <p className="text-center mt-10">Loading todos...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Todo App ✨
      </h1>
      <Toaster />

      {/* Input + Button */}
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          className="rounded-xl"
        />
        <Button
          className="rounded-xl bg-blue-600 hover:bg-blue-700 cursor-pointer"
          onClick={() => {
            if (title.trim()) {
              addTodo.mutate(title, {
                onSuccess: () => {
                  toast.success("Todo added successfully ✅");
                  setTitle("");
                },
                onError: () => {
                  toast.error("Failed to add todo ❌");
                },
              });
            } else {
              toast.error("Please enter a todo first!");
            }
          }}
        >
          Add
        </Button>
      </div>

      {/* Todo List */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-4 space-y-3">
          <AnimatePresence>
            {todos?.length ? (
              todos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TodoItem todo={todo} />
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">
                No todos yet 🚀 <br /> Add one above!
              </p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
