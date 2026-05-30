import {
  FaBook,
  FaChartBar,
  FaMoneyBill,
  FaTimes,
  FaUser,
  FaRobot,
  FaBrain,
  FaCalendarAlt,
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
        initial={{
          x: -300
        }}

        animate={{
          x: 0
        }}

        transition={{
          duration: 0.4
        }}
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

          <li>
            <Link
              to="/profile"
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
              ">
              <FaUser />

              Profile
            </Link>
          </li>

          <li>
            <Link
              to="/advanced-analytics"
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
               ">
              <FaChartBar />

              Advanced Analytics
            </Link>
          </li>
          <li>
            <Link
              to="/ai-chat"

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
              <FaRobot />

              AI Assistant
            </Link>
          </li>
          <li>
            <Link
              to="/recommendations"

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
              <FaBrain />

              AI Recommendations
            </Link>
          </li>
          <li>
            <Link
              to="/scheduler"

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
              <FaCalendarAlt />

              Scheduler
            </Link>
          </li>

        </ul>

      </motion.div>

    </>
  );
}

export default Sidebar;