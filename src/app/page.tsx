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
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please login to use the Todo App 🔒");
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <p className="text-center mt-10 text-lg text-gray-600 animate-pulse">
        Checking authentication...
      </p>
    );
  }

  if (isLoading)
    return (
      <p className="text-center mt-10 text-lg text-gray-600 animate-pulse">
        Loading todos...
      </p>
    );

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-8 px-4">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
        Todo App ✨
      </h1>
      <Toaster />

      {/* Input + Button */}
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          className="rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-400"
        />
        <Button
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white font-semibold shadow-md transition-all duration-200 cursor-pointer"
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
      <Card className="shadow-xl rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm">
        <CardContent className="p-5 space-y-3">
          <AnimatePresence>
            {todos?.length ? (
              todos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <TodoItem todo={todo} />
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 py-6"
              >
                No todos yet 🚀 <br /> Add one above!
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
