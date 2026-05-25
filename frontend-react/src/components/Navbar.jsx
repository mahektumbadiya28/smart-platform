import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-slate-800/60 backdrop-blur px-6 py-4 rounded-2xl border border-slate-700 shadow-lg">
      <div>
        <h2 className="text-xl font-bold text-white">Dashboard 🚀</h2>
        <p className="text-xs text-slate-400 mt-0.5">Welcome back!</p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;