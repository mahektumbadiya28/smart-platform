import {
  FaBook,
  FaMoneyBill,
  FaCalendar,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>SmartPlatform</h2>

      <ul>
        <li>
          <FaBook /> Study Helper
        </li>

        <li>
          <FaMoneyBill /> Expense Tracker
        </li>

        <li>
          <FaCalendar /> Scheduler
        </li>

        <li>
          <FaChartBar /> Analytics
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;