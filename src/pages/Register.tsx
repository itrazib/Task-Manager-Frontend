import { useForm } from "react-hook-form";
import { api } from "../api/axios";
import { useState } from "react";

export default function Register() {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setError(null);
    setSuccess(null);

    try {
      await api.post("/auth/register", data);
      setSuccess("Registration successful. Please login.");
      reset();
    } catch (err: any) {
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow w-80 space-y-3"
      >
        <h2 className="text-xl font-semibold text-center">Register</h2>

        
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}

        <input
          className="input"
          {...register("userCode", { required: true })}
          placeholder="User Code (e.g. r1002)"
        />

        <input
          className="input"
          {...register("name", { required: true })}
          placeholder="Name"
        />

        <input
          className="input"
          {...register("email", { required: true })}
          placeholder="Email"
        />

        <input
          className="input"
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />

        <button className="btn">Register</button>
      </form>
    </div>
  );
}
