import { Link, Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  
 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between">
        <Link to="/" className="font-bold text-lg">
          TaskManager
        </Link>

        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      
      <Outlet />
    </>
  );
}
