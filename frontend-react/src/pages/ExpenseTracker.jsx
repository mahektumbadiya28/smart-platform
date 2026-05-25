import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const CATEGORIES = ["Food", "Travel", "Shopping", "Education", "Other"];

const CATEGORY_COLORS = {
    Food: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    Travel: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Shopping: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    Education: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    Other: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

function ExpenseTracker() {
    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [expenses, setExpenses] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);

    const headers = { Authorization: `Bearer ${token}` };

    const fetchExpenses = async () => {
        try {
            const response = await API.get("/study/expense/all/", { headers });
            setExpenses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const response = await API.get("/study/expense/analytics/", { headers });
            setAnalytics(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExpenses();
        fetchAnalytics();
    }, []);

    const addExpense = async () => {
        if (!title || !amount) return alert("Please fill all fields");
        setLoading(true);
        try {
            await API.post(
                "/study/expense/add/",
                { title, amount: parseFloat(amount), category },
                { headers }
            );
            setTitle("");
            setAmount("");
            await Promise.all([fetchExpenses(), fetchAnalytics()]);
        } catch (error) {
            console.log(error);
            alert("Failed to add expense");
        } finally {
            setLoading(false);
        }
    };

    const totalSpend = analytics?.total_expense ?? 0;
    const categoryData = analytics?.category_data ?? [];

    return (
        <div className="flex bg-slate-950 min-h-screen text-white">
            <Sidebar />

            <div className="flex-1 p-8 space-y-8">
                <Navbar />

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Expense Tracker 💸</h1>
                    <p className="text-slate-400 text-sm mt-1">Track and analyze your spending</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm mb-2">Total Spent</p>
                        <p className="text-3xl font-bold text-emerald-400">₹{totalSpend.toFixed(2)}</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm mb-2">Total Transactions</p>
                        <p className="text-3xl font-bold text-cyan-400">{expenses.length}</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm mb-2">Categories Used</p>
                        <p className="text-3xl font-bold text-violet-400">{categoryData.length}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Add Expense Form */}
                    <div className="xl:col-span-1 bg-slate-800 border border-slate-700 rounded-2xl p-6 h-fit">
                        <h2 className="text-lg font-semibold mb-5">Add Expense</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-slate-400 mb-1.5 block">Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Lunch, Flight ticket..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 focus:border-cyan-500 focus:outline-none text-white placeholder-slate-500 px-4 py-3 rounded-xl text-sm transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-slate-400 mb-1.5 block">Amount (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 focus:border-cyan-500 focus:outline-none text-white placeholder-slate-500 px-4 py-3 rounded-xl text-sm transition-colors"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-slate-400 mb-1.5 block">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 focus:border-cyan-500 focus:outline-none text-white px-4 py-3 rounded-xl text-sm transition-colors"
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={addExpense}
                                disabled={loading}
                                className="w-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
                            >
                                {loading ? "Adding..." : "+ Add Expense"}
                            </button>
                        </div>

                        {/* Category Breakdown */}
                        {categoryData.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-sm font-semibold text-slate-300 mb-3">By Category</h3>
                                <div className="space-y-2">
                                    {categoryData.map((item) => (
                                        <div key={item.category} className="flex justify-between items-center">
                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other}`}>
                                                {item.category}
                                            </span>
                                            <span className="text-sm text-slate-300 font-semibold">{item.total} entries</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Expense List */}
                    <div className="xl:col-span-2 space-y-3">
                        <h2 className="text-lg font-semibold">All Expenses</h2>

                        {expenses.length === 0 ? (
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 text-center">
                                <p className="text-4xl mb-3">💸</p>
                                <p className="text-slate-400 text-sm">No expenses yet. Add your first one!</p>
                            </div>
                        ) : (
                            expenses.map((expense) => (
                                <div
                                    key={expense.id}
                                    className="bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-2xl px-5 py-4 flex items-center justify-between transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-lg">
                                            {expense.category === "Food" ? "🍔" :
                                                expense.category === "Travel" ? "✈️" :
                                                    expense.category === "Shopping" ? "🛍️" :
                                                        expense.category === "Education" ? "📚" : "💡"}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white text-sm">{expense.title}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-md border ${CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other}`}>
                                                {expense.category}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-emerald-400 font-bold text-lg">₹{expense.amount}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpenseTracker;
