import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await API.post("/auth/login/", formData);
      localStorage.setItem("token", response.data.access);
      toast.success("Login Successful 🚀");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid Credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative bg-slate-800/80 backdrop-blur border border-slate-700 p-10 rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">⚡</h1>
          <h2 className="text-2xl font-bold text-white mt-2">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-1">Sign in to SmartPlatform</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-slate-900 border border-slate-600 focus:border-cyan-500 focus:outline-none text-white placeholder-slate-500 px-4 py-3 rounded-xl text-sm transition-colors"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full bg-slate-900 border border-slate-600 focus:border-cyan-500 focus:outline-none text-white placeholder-slate-500 px-4 py-3 rounded-xl text-sm transition-colors"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
          >
            {loading ? "Signing in..." : "Login →"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;