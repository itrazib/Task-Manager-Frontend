import { useForm } from "react-hook-form";
import { api } from "../api/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function TaskForm() {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  // Fetch users for dropdown
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await api.get("/auth/users")).data
  });

  const onSubmit = async (data: any) => {
    await api.post("/tasks", data);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-2">
      <h2 className="font-semibold">Create Task</h2>

      <input
        className="input"
        {...register("title", { required: true })}
        placeholder="Title"
      />

      <textarea
        className="input"
        {...register("description")}
        placeholder="Description"
      />

      <select className="input" {...register("priority")}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input className="input" type="date" {...register("dueDate")} />

      {/*Assigned user dropdown */}
      <select className="input" {...register("assignedToId", { required: true })}>
        <option value="">Assign to user</option>
        {users.map((u: any) => (
          <option key={u._id} value={u.userCode}>
            {u.name} ({u.userCode})
          </option>
        ))}
      </select>

      <button className="btn">Create</button>
    </form>
  );
}
