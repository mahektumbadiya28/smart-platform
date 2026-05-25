import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const statCards = [
  { title: "Study Notes", value: "24", icon: "📚", color: "from-cyan-500 to-blue-600" },
  { title: "AI Summaries", value: "18", icon: "🤖", color: "from-violet-500 to-purple-600" },
  { title: "Quizzes", value: "12", icon: "🧠", color: "from-orange-500 to-pink-600" },
  { title: "Expenses", value: "₹5,400", icon: "💸", color: "from-emerald-500 to-teal-600" },
];

function Dashboard() {
  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8 space-y-8">
        <Navbar />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {statCards.map((card) => (
            <div
              key={card.title}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-400 font-medium">{card.title}</p>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <p className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-2">Welcome to SmartPlatform 🚀</h2>
          <p className="text-slate-400 text-sm">
            Your all-in-one productivity ecosystem. Track expenses, manage study notes, and get AI-powered insights.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="/study"
              className="bg-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              Open Study Helper →
            </a>
            <a
              href="/expenses"
              className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              Track Expenses →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;