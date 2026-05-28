import {
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

function Dashboard() {

  const [
    sidebarOpen,
    setSidebarOpen
  ] = useState(false);

  return (
    <div className="
      flex
      min-h-screen

      bg-gray-100
      dark:bg-slate-950

      text-black
      dark:text-white
    ">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 p-4 lg:p-8">

        <Navbar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4

          gap-6
          mt-10
        ">

          <div className="
            bg-white
            dark:bg-slate-800

            p-6
            rounded-2xl
            shadow-lg
          ">
            <h2 className="text-xl font-semibold">
              Study Notes
            </h2>

            <p className="
              text-4xl
              mt-4
              text-cyan-400
            ">
              24
            </p>
          </div>

          <div className="
            bg-white
            dark:bg-slate-800

            p-6
            rounded-2xl
            shadow-lg
          ">
            <h2 className="text-xl font-semibold">
              AI Summaries
            </h2>

            <p className="
              text-4xl
              mt-4
              text-cyan-400
            ">
              18
            </p>
          </div>

          <div className="
            bg-white
            dark:bg-slate-800

            p-6
            rounded-2xl
            shadow-lg
          ">
            <h2 className="text-xl font-semibold">
              Quizzes
            </h2>

            <p className="
              text-4xl
              mt-4
              text-cyan-400
            ">
              12
            </p>
          </div>

          <div className="
            bg-white
            dark:bg-slate-800

            p-6
            rounded-2xl
            shadow-lg
          ">
            <h2 className="text-xl font-semibold">
              Expenses
            </h2>

            <p className="
              text-4xl
              mt-4
              text-cyan-400
            ">
              ₹5400
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;