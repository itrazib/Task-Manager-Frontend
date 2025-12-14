import { useForm } from "react-hook-form";
import { api } from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
// import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { setUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    const res = await api.post("/auth/login", data);
    if (res.data) {
      setUser(res.data);
    navigate('/')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow w-80 space-y-3"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>
        <input className="input" {...register("email")} placeholder="Email" />
        <input
          className="input"
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
}
