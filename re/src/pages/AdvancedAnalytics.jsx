import {
    useEffect,
    useState
} from "react";

import {
    motion
} from "framer-motion";

import API from "../services/api";

import {

    Chart as ChartJS,

    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,

    Tooltip,
    Legend,

} from "chart.js";

import {
    Line,
    Pie,
    Bar
} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Tooltip,
    Legend
);

function AdvancedAnalytics() {

    const token = localStorage.getItem("token");

    const [expenseData, setExpenseData] = useState(null);

    const [studyData, setStudyData] = useState(null);

    const fetchAnalytics = async () => {

        try {

            const expenseResponse = await API.get(
                "/study/expense/analytics/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const studyResponse = await API.get(
                "/study/analytics/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setExpenseData(expenseResponse.data);

            setStudyData(studyResponse.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAnalytics();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!expenseData || !studyData) {

        return <h1>Loading...</h1>;
    }

    // PIE CHART

    const pieData = {

        labels: expenseData.category_data.map(
            item => item.category
        ),

        datasets: [
            {
                data: expenseData.category_data.map(
                    item => item.total
                ),
            },
        ],
    };

    // LINE CHART

    const lineData = {

        labels: expenseData.monthly_data.map(
            item => `Month ${item.created_at__month}`
        ),

        datasets: [
            {
                label: "Monthly Expenses",

                data: expenseData.monthly_data.map(
                    item => item.total
                ),
            },
        ],
    };

    // BAR CHART

    const barData = {

        labels: studyData.recent_notes.map(
            item => item.created_at__date
        ),

        datasets: [
            {
                label: "Study Notes",

                data: studyData.recent_notes.map(
                    item => item.count
                ),
            },
        ],
    };

    return (
        <motion.div

            initial={{
                opacity: 0
            }}

            animate={{
                opacity: 1
            }}

            className="
        min-h-screen

        bg-gray-100
        dark:bg-slate-950

        text-black
        dark:text-white

        p-6
      "
        >

            <h1 className="
        text-4xl
        font-bold
        mb-10
      ">
                Advanced Analytics 📈
            </h1>

            {/* Stats */}

            <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4

        gap-6
        mb-10
      ">

                <div className="
          bg-white
          dark:bg-slate-800

          p-6
          rounded-2xl
          shadow-lg
        ">
                    <h2>Total Expense</h2>

                    <p className="
            text-3xl
            mt-3
            text-cyan-400
          ">
                        ₹{expenseData.total_expense}
                    </p>
                </div>

                <div className="
          bg-white
          dark:bg-slate-800

          p-6
          rounded-2xl
          shadow-lg
        ">
                    <h2>Total Notes</h2>

                    <p className="
            text-3xl
            mt-3
            text-cyan-400
          ">
                        {studyData.total_notes}
                    </p>
                </div>

                <div className="
          bg-white
          dark:bg-slate-800

          p-6
          rounded-2xl
          shadow-lg
        ">
                    <h2>Total Quizzes</h2>

                    <p className="
            text-3xl
            mt-3
            text-cyan-400
          ">
                        {studyData.total_quizzes}
                    </p>
                </div>

                <div className="
          bg-white
          dark:bg-slate-800

          p-6
          rounded-2xl
          shadow-lg
        ">
                    <h2>AI Summaries</h2>

                    <p className="
            text-3xl
            mt-3
            text-cyan-400
          ">
                        {studyData.summaries_generated}
                    </p>
                </div>

            </div>

            {/* Charts */}

            <div className="
        grid
        grid-cols-1
        lg:grid-cols-2

        gap-8
      ">

                {/* Pie Chart */}

                <motion.div

                    whileHover={{
                        scale: 1.02
                    }}

                    className="
            bg-white
            dark:bg-slate-800

            p-6
            rounded-2xl
            shadow-lg
          "
                >

                    <h2 className="
            text-2xl
            mb-5
          ">
                        Expense Categories 🥧
                    </h2>

                    <Pie data={pieData} />

                </motion.div>

                {/* Line Chart */}

                <motion.div

                    whileHover={{
                        scale: 1.02
                    }}

                    className="
            bg-white
            dark:bg-slate-800

            p-6
            rounded-2xl
            shadow-lg
          "
                >

                    <h2 className="
            text-2xl
            mb-5
          ">
                        Monthly Expenses 📈
                    </h2>

                    <Line data={lineData} />

                </motion.div>

                {/* Bar Chart */}

                <motion.div

                    whileHover={{
                        scale: 1.02
                    }}

                    className="
            bg-white
            dark:bg-slate-800

            p-6
            rounded-2xl
            shadow-lg

            lg:col-span-2
          "
                >

                    <h2 className="
            text-2xl
            mb-5
          ">
                        Study Activity 📊
                    </h2>

                    <Bar data={barData} />

                </motion.div>

            </div>

        </motion.div>
    );
}

export default AdvancedAnalytics;