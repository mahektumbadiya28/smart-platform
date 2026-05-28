// import { FaBook, FaChartBar, FaMoneyBill, } from "react-icons/fa";

// import { Link, useLocation } from "react-router-dom";

// function Sidebar() {
//   const location = useLocation();

//   const links = [
//     { to: "/study", icon: <FaBook />, label: "Study Helper" },
//     { to: "/analytics", icon: <FaChartBar />, label: "Analytics" },
//     { to: "/expenses", icon: <FaMoneyBill />, label: "Expenses" },
//   ];

//   return (
//     <div className="w-64 min-h-screen p-6 border-r bg-white dark:bg-slate-900 text-black dark:text-white border-gray-300 dark:border-slate-700">
//       {/* <div className="w-64 min-h-screen bg-slate-900 p-6 border-r border-slate-700 flex flex-col"> */}
//       <h1 className="text-2xl font-bold text-cyan-400 mb-10 tracking-wide">
//         ⚡ SmartPlatform
//       </h1>

//       <ul className="space-y-3 flex-1">
//         {links.map((link) => (
//           <li key={link.to}>
//             <Link
//               to={link.to}
//               className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
//                 ${location.pathname === link.to
//                   ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
//                   : "text-slate-400 hover:bg-slate-800 hover:text-cyan-400"
//                 }`}
//             >
//               <span className="text-base">{link.icon}</span>
//               {link.label}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <p className="text-xs text-slate-600 text-center mt-6">v1.0.0 • SmartPlatform</p>
//     </div>
//   );
// }

// export default Sidebar;

import {
  FaBook,
  FaChartBar,
  FaMoneyBill,
  FaTimes,
} from "react-icons/fa";
import {
  motion
} from "framer-motion";
import { Link } from "react-router-dom";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  return (
    <>

      {/* Overlay */}

      {
        sidebarOpen && (
          <div
            className="
              fixed
              inset-0
              bg-black/50
              z-40
              lg:hidden
            "
            onClick={() =>
              setSidebarOpen(false)
            }
          />
        )
      }

      {/* Sidebar */}

      <motion.div
        className={`
          fixed
          top-0
          left-0
          z-50

          w-64
          h-full

          transform
          transition-transform
          duration-300

          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:translate-x-0
          lg:static

          bg-white
          dark:bg-slate-900

          text-black
          dark:text-white

          border-r
          border-gray-300
          dark:border-slate-700

          p-6
        `}
      >

        {/* Close button mobile */}

        <div className="flex justify-between items-center lg:hidden mb-6">

          <h1 className="text-2xl font-bold text-cyan-400">
            SmartPlatform
          </h1>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaTimes size={22} />
          </button>

        </div>

        {/* Desktop Logo */}

        <h1 className="
          hidden
          lg:block

          text-3xl
          font-bold
          text-cyan-400
          mb-10
        ">
          SmartPlatform
        </h1>

        <ul className="space-y-5">

          <li>
            <Link
              to="/study"
              onClick={() =>
                setSidebarOpen(false)
              }
              className="
                flex
                items-center
                gap-3
                text-lg

                hover:text-cyan-400
                transition
              "
            >
              <FaBook />

              Study Helper
            </Link>
          </li>

          <li>
            <Link
              to="/analytics"
              onClick={() =>
                setSidebarOpen(false)
              }
              className="
                flex
                items-center
                gap-3
                text-lg

                hover:text-cyan-400
                transition
              "
            >
              <FaChartBar />

              Analytics
            </Link>
          </li>

          <li>
            <Link
              to="/expenses"
              onClick={() =>
                setSidebarOpen(false)
              }
              className="
                flex
                items-center
                gap-3
                text-lg

                hover:text-cyan-400
                transition
              "
            >
              <FaMoneyBill />

              Expenses
            </Link>
          </li>

        </ul>

      </motion.div>

    </>
  );
}

export default Sidebar;