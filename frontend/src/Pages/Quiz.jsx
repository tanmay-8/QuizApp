import React, { useEffect, useState } from "react";
import Question from "../Components/Question";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/image.png";

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/quiz/questions",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authtoken: localStorage.getItem("token") || "",
                    },
                }
            );
            const data = await response.json();
            setQuestions(data.questions);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/start");
        }
        fetchQuestions();
    }, []);

    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center pb-8">
            <header className="bg-purple-600 w-full p-4 shadow-md flex items-center  justify-between">
                <img src={Logo} alt="logo" className="h-16 w-fit"></img>
                <h1 className="text-4xl font-bold text-center w-fit">Quiz</h1>
            </header>
            <div className="p-6 flex justify-between items-center w-full">
                {/* <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => {
                        navigate("/leaderboard");
                    }}
                >
                    {" "}
                    Leaderboard
                </button> */}
            </div>
            <main className="flex flex-col items-center w-full mt-8 px-4 space-y-6">
                {questions.map((question, index) => (
                    <Question
                        key={question._id}
                        question={question}
                        fetchQuestions={fetchQuestions}
                        index={index}
                    />
                ))}
            </main>
        </div>
    );
}

export default Quiz;
