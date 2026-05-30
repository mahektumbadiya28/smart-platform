import {
    useState
} from "react";

import {
    motion
} from "framer-motion";

import {
    toast
} from "react-toastify";

import API from "../services/api";

function AIChat() {

    const token = localStorage.getItem(
        "token"
    );

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message,
        };

        setMessages(prev => [
            ...prev,
            userMessage
        ]);

        setLoading(true);

        try {

            const response = await API.post(

                "/study/ai-chat/",

                {
                    message
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const aiMessage = {

                sender: "ai",

                text: response.data.response,
            };

            setMessages(prev => [
                ...prev,
                aiMessage
            ]);

            setMessage("");

        } catch (error) {

            toast.error(
                "AI Error ❌"
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

            <h1 className="
        text-4xl
        font-bold
        mb-6
      ">
                AI Assistant 🤖
            </h1>

            {/* Chat Box */}

            <div className="
        bg-white
        dark:bg-slate-800

        rounded-2xl
        shadow-xl

        p-5

        h-[70vh]
        overflow-y-auto
      ">

                {
                    messages.map((msg, index) => (

                        <motion.div

                            key={index}

                            initial={{
                                opacity: 0,
                                y: 20
                            }}

                            animate={{
                                opacity: 1,
                                y: 0
                            }}

                            className={`
                mb-4
                p-4
                rounded-xl
                max-w-[80%]

                ${msg.sender === "user"

                                    ? `
                    bg-cyan-500
                    text-white
                    ml-auto
                  `

                                    : `
                    bg-gray-200
                    dark:bg-slate-700
                  `
                                }
              `}
                        >

                            {msg.text}

                        </motion.div>
                    ))
                }

                {
                    loading && (
                        <p>
                            AI is thinking...
                        </p>
                    )
                }

            </div>

            {/* Input */}

            <div className="
        flex
        gap-4
        mt-5
      ">

                <input

                    type="text"

                    placeholder="Ask AI anything..."

                    value={message}

                    onChange={(e) =>
                        setMessage(e.target.value)
                    }

                    className="
            flex-1

            p-4
            rounded-xl

            bg-white
            dark:bg-slate-800
          "
                />

                <motion.button

                    whileHover={{
                        scale: 1.05
                    }}

                    whileTap={{
                        scale: 0.95
                    }}

                    onClick={sendMessage}

                    className="
            bg-cyan-500
            hover:bg-cyan-600

            px-8
            rounded-xl

            font-bold
          "
                >
                    Send
                </motion.button>

            </div>

        </div>
    );
}

export default AIChat;