import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="cards-container">
          <DashboardCard
            title="Study Sessions"
            value="12"
          />

          <DashboardCard
            title="Expenses Added"
            value="₹5400"
          />

          <DashboardCard
            title="Tasks Completed"
            value="18"
          />

          <DashboardCard
            title="Analytics Reports"
            value="7"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// function Dashboard() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Smart Platform Dashboard 🚀</h1>

//       <p>
//         Authentication Working Successfully
//       </p>
//     </div>
//   );
// }

// export default Dashboard;