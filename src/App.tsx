import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import useAuth from "./hooks/useAuth";
// import { useAuth } from "./auth/AuthContext";


export default function App() {
const { user } = useAuth();
return user ? <Dashboard /> : <Login />;
}