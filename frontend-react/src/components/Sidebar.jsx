import {
  FaBook,
  FaChartBar,
  FaMoneyBill,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/study", icon: <FaBook />, label: "Study Helper" },
    { to: "/analytics", icon: <FaChartBar />, label: "Analytics" },
    { to: "/expenses", icon: <FaMoneyBill />, label: "Expenses" },
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 p-6 border-r border-slate-700 flex flex-col">
      <h1 className="text-2xl font-bold text-cyan-400 mb-10 tracking-wide">
        ⚡ SmartPlatform
      </h1>

      <ul className="space-y-3 flex-1">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${location.pathname === link.to
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-cyan-400"
                }`}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-xs text-slate-600 text-center mt-6">v1.0.0 • SmartPlatform</p>
    </div>
  );
}

export default Sidebar;