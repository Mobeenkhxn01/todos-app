import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
}

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get("/api/todos");
      return res.data;
    },
    staleTime: 1000 * 60,
  });

  // ✅ Add todo (optimistic update)
  const addTodo = useMutation({
    mutationFn: async (title: string) => {
      const res = await axios.post("/api/todos", { title });
      return res.data;
    },
    onMutate: async (title: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      const optimisticTodo: Todo = {
        id: Date.now().toString(),
        title,
        completed: false,
      };

      queryClient.setQueryData<Todo[]>(["todos"], (old) => [
        ...(old || []),
        optimisticTodo,
      ]);

      return { prevTodos };
    },
    onError: (_err, _title, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // ✅ Toggle todo (optimistic update)
  const toggleTodo = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const res = await axios.put(`/api/todos/${id}`, { completed });
      return res.data;
    },
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((t) => (t.id === id ? { ...t, completed } : t)) || []
      );

      return { prevTodos };
    },
    onError: (_err, _variables, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // ✅ Delete todo (optimistic update)
  const deleteTodo = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`/api/todos/${id}`);
      return res.data;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.filter((t) => t.id !== id) || []
      );

      return { prevTodos };
    },
    onError: (_err, _id, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { todos, isLoading, isError, addTodo, toggleTodo, deleteTodo };
}
