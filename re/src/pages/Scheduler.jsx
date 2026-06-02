import {
    useEffect,
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    toast
} from "react-toastify";

import API from "../services/api";

function Scheduler() {

    const token = localStorage.getItem(
        "token"
    );

    const [
        schedules,
        setSchedules
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(false);

    const fetchSchedules = async () => {

        try {

            const response = await API.get(

                "/study/schedules/",

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSchedules(response.data);

        } catch {

            console.log("error");
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSchedules();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generateAISchedule = async () => {

        setLoading(true);

        try {

            const response = await API.post(

                "/study/schedules/generate/",

                {},

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSchedules(prev => [

                response.data,

                ...prev
            ]);

            toast.success(
                "AI Schedule Generated 📅"
            );

        } catch {

            toast.error(
                "Generation Failed ❌"
            );
        }

        setLoading(false);
    };

    const markCompleted = async (id) => {

        try {

            await API.put(

                `/study/schedules/complete/${id}/`,

                {},

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSchedules(prev =>

                prev.map(item =>

                    item.id === id

                        ? {
                            ...item,
                            completed: true
                        }

                        : item
                )
            );

            toast.success(
                "Task Completed ✅"
            );

        } catch {

            toast.error(
                "Update Failed ❌"
            );
        }
    };

    return (
        <div className="
      min-h-screen

      bg-gray-100
      dark:bg-slate-950

      text-black
      dark:text-white

      p-6
    ">

            <div className="
        flex
        justify-between
        items-center
        mb-8
      ">

                <h1 className="
          text-4xl
          font-bold
        ">
                    Smart Scheduler 📅
                </h1>

                <motion.button

                    whileHover={{
                        scale: 1.05
                    }}

                    whileTap={{
                        scale: 0.95
                    }}

                    onClick={
                        generateAISchedule
                    }

                    className="
            bg-cyan-500
            hover:bg-cyan-600

            px-6
            py-3

            rounded-xl
            font-bold
          "
                >

                    {
                        loading
                            ? "Generating..."
                            : "Generate AI Schedule"
                    }

                </motion.button>

            </div>

            <div className="
        grid
        gap-6
      ">

                {
                    schedules.map((item) => (

                        <motion.div

                            key={item.id}

                            initial={{
                                opacity: 0,
                                y: 20
                            }}

                            animate={{
                                opacity: 1,
                                y: 0
                            }}

                            whileHover={{
                                scale: 1.01
                            }}

                            className={`
                p-6
                rounded-2xl
                shadow-lg

                ${item.completed

                                    ? `
                    bg-green-200
                    dark:bg-green-800
                  `

                                    : `
                    bg-white
                    dark:bg-slate-800
                  `
                                }
              `}
                        >

                            <div className="
                flex
                justify-between
                items-center
              ">

                                <div>

                                    <h2 className="
                    text-2xl
                    font-bold
                  ">
                                        {item.title}
                                    </h2>

                                    <p className="
                    mt-4
                    whitespace-pre-line
                    leading-8
                  ">
                                        {item.description}
                                    </p>

                                </div>

                                {
                                    !item.completed && (

                                        <motion.button

                                            whileHover={{
                                                scale: 1.05
                                            }}

                                            whileTap={{
                                                scale: 0.95
                                            }}

                                            onClick={() =>
                                                markCompleted(item.id)
                                            }

                                            className="
                        bg-cyan-500
                        hover:bg-cyan-600

                        px-5
                        py-3

                        rounded-xl
                        font-bold
                      "
                                        >
                                            Complete
                                        </motion.button>
                                    )
                                }

                            </div>

                        </motion.div>
                    ))
                }

            </div>

        </div>
    );
}

export default Scheduler;
