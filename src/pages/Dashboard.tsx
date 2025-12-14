import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import { socket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

type FilterType = "all" | "assigned" | "created" | "overdue";

export default function Dashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<FilterType>("all");

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => (await api.get("/tasks")).data,
  });

  const overdue = tasks.filter(
    (t: any) =>
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done"
  );

  const assigned = tasks.filter((t: any) => t.assignedToId === user?.id);

  const created = tasks.filter((t: any) => t.creatorId === user?.id);

  const filteredTasks = tasks.filter((t: any) => {
    if (filter === "assigned") return t.assignedToId === user?.id;
    if (filter === "created") return t.creatorId === user?.id;
    if (filter === "overdue")
      return (
        t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done"
      );
    return true;
  });

  useEffect(() => {
    if (user) socket.emit("register", user.id);

    socket.on("taskUpdated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("taskAssigned", (data) => {
      toast("New task assigned: " + data.title);
    });

    return () => {
      socket.off("taskUpdated");
      socket.off("taskAssigned");
    };
  }, [user, queryClient]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Welcome back 👋
        </h1>
        <p className="text-slate-500 mt-1">Manage your tasks efficiently</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard title="Assigned" value={assigned.length} />
        <StatCard title="Created" value={created.length} />
        <StatCard title="Overdue" value={overdue.length} danger />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {(["all", "assigned", "created", "overdue"] as FilterType[]).map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
                ${
                  filter === f
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
            >
              {f.toUpperCase()}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-5">
            <TaskForm />
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredTasks.map((task: any) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  danger,
}: {
  title: string;
  value: number;
  danger?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-xl backdrop-blur bg-white/70
      ${danger ? "border border-red-200" : ""}`}
    >
      <p className="text-sm text-slate-500">{title}</p>
      <h2
        className={`text-3xl font-bold mt-2 ${
          danger ? "text-red-500" : "text-slate-800"
        }`}
      >
        {value}
      </h2>
    </div>
  );
}
