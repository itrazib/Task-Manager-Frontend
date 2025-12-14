import { api } from "../api/axios";
import { useQueryClient } from "@tanstack/react-query";

export default function TaskCard({ task }: any) {
  const queryClient = useQueryClient();

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done";

  const deleteTask = async () => {
    await api.delete(`/tasks/${task._id}`);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const updateStatus = async (status: string) => {
    await api.patch(`/tasks/${task._id}`, { status });
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return (
    <div
      className={`card space-y-2 ${
        isOverdue ? "border-2 border-red-500 bg-red-50" : ""
      }`}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>

      <div className="text-xs flex justify-between">
        <span>Status: {task.status}</span>
        <span>Priority: {task.priority}</span>
      </div>

      {task.dueDate && (
        <p className="text-xs text-red-600">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <select
        className="input"
        value={task.status}
        onChange={(e) => updateStatus(e.target.value)}
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <button onClick={deleteTask} className="btn bg-red-500">
        Delete
      </button>
    </div>
  );
}
