import { useNavigate } from "react-router-dom";
import {
  motion
} from "framer-motion";
import {
  useContext
} from "react";

import {
  ThemeContext
} from "../context/ThemeContext";

import {
  FaBars
} from "react-icons/fa";

function Navbar({
  setSidebarOpen
}) {

  const navigate = useNavigate();

  const {
    darkMode,
    setDarkMode
  } = useContext(ThemeContext);

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -50
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.5
      }}
      className="
      flex
      justify-between
      items-center

      p-5
      rounded-xl
      shadow-lg

      bg-white
      dark:bg-slate-800

      text-black
      dark:text-white
    ">

      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}

        <motion.button
          className="lg:hidden"
          onClick={() =>
            setSidebarOpen(true)
          }
        >
          <FaBars size={22} />
        </motion.button>

        <h2 className="text-2xl font-bold">
          Dashboard 🚀
        </h2>

      </div>

      <div className="flex gap-4">

        <motion.button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="
            px-4
            py-2
            rounded-lg

            bg-slate-200
            dark:bg-slate-700
          "
        >
          {
            darkMode
              ? "☀️"
              : "🌙"
          }
        </motion.button>

        <motion.button

          whileHover={{
            scale: 1.05
          }}

          whileTap={{
            scale: 0.95
          }}
          onClick={handleLogout}
          className="
            bg-cyan-500
            hover:bg-cyan-600

            px-5
            py-2
            rounded-lg
          "
        >
          Logout
        </motion.button>

      </div>

    </motion.div>
  );
}

export default Navbar;