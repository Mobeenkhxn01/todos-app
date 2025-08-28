"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/hooks/useTodos";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function TodoItem({ todo }: { todo: { id: string; title: string; completed: boolean } }) {
  const { toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="flex items-center justify-between gap-2 p-2 border rounded-lg">
      <div className="flex items-center gap-2">
        <Checkbox
          className="cursor-pointer"
          checked={todo.completed}
          onCheckedChange={(checked) =>
            toggleTodo.mutate(
              { id: todo.id, completed: !!checked },
              {
                onSuccess: () => {
                  toast.success(
                    checked ? "Marked as completed ✅" : "Marked as pending ⏳"
                  );
                },
                onError: () => {
                  toast.error("Failed to update todo ❌");
                },
              }
            )
          }
        />
        <span
          className={`font-medium transition-colors capitalize ${
            todo.completed
              ? "line-through text-green-600"
              : "text-blue-600 hover:text-blue-800"
          }`}
        >
          {todo.title}
        </span>
      </div>

      <Button
        variant="secondary"
        size="sm"
        className="text-red-600 hover:bg-red-100 bg-blue-100 cursor-pointer"
        onClick={() => {
          deleteTodo.mutate(todo.id);
          toast.success("Todo deleted 🗑️");
        }}
      >
        <Trash />
      </Button>
    </div>
  );
}
