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

function Recommendations() {

    const token = localStorage.getItem(
        "token"
    );

    const [
        recommendations,
        setRecommendations
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(false);

    useEffect(() => {

        fetchRecommendations();

    }, []);

    const fetchRecommendations = async () => {

        try {

            const response = await API.get(

                "/study/recommendations/",

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRecommendations(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    const generateAIRecommendation = async () => {

        setLoading(true);

        try {

            const response = await API.post(

                "/study/recommendations/generate/",

                {},

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRecommendations(prev => [

                response.data,

                ...prev
            ]);

            toast.success(
                "AI Recommendations Generated 🧠"
            );

        } catch (error) {

            toast.error(
                "Generation Failed ❌"
            );
        }

        setLoading(false);
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
                    AI Study Recommendations 🧠
                </h1>

                <motion.button

                    whileHover={{
                        scale: 1.05
                    }}

                    whileTap={{
                        scale: 0.95
                    }}

                    onClick={
                        generateAIRecommendation
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
                            : "Generate AI Plan"
                    }

                </motion.button>

            </div>

            <div className="
        grid
        gap-6
      ">

                {
                    recommendations.map((item) => (

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

                            className="
                bg-white
                dark:bg-slate-800

                p-6
                rounded-2xl

                shadow-lg
              "
                        >

                            <h2 className="
                text-xl
                font-bold
                mb-4
              ">
                                Personalized Recommendation
                            </h2>

                            <p className="
                whitespace-pre-line
                leading-8
              ">
                                {item.recommendation}
                            </p>

                        </motion.div>
                    ))
                }

            </div>

        </div>
    );
}

export default Recommendations;