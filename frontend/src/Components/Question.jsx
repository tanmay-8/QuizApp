import React, { useState } from "react";
import { isEqual, set } from "lodash";

const Question = ({ question, fetchQuestions, index }) => {
    const [answer, setAnswer] = useState("");

    const handleanswerChange = (value) => {
        setAnswer(value);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/quiz/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authtoken: localStorage.getItem("token") || "",
                    },
                    body: JSON.stringify({
                        questionId: question._id,
                        answer: answer,
                    }),
                }
            );
            const data = await res.json();

            if (data.correct) {
            } else {
                setIsWrong(true);
                setTimeout(() => {
                    setIsWrong(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
        setIsLoading(false);
        fetchQuestions();
    };

    return (
        <>
            {!question.isSolved ? (
                <div
                    className={`bg-gray-900 text-white rounded-lg shadow-lg p-6 mb-4 w-full ${
                        isWrong ? "border border-red-600" : ""
                    }`}
                >
                    <h2 className="text-xl font-bold mb-4">Question {index}</h2>
                    <p className="mb-4">{question.description}</p>
                    {question.options.length === 0 ? (
                        <div className="mb-4">
                            <input
                                type="text"
                                className={`w-full bg-gray-800 text-white px-4 py-2 rounded outline-none border border-gray-700  focus:border-blue-600  ${
                                    isWrong ? "border border-red-600" : ""
                                }`}
                                value={answer}
                                onChange={(e) =>
                                    handleanswerChange(e.target.value)
                                }
                            />
                        </div>
                    ) : (
                        <div className="mb-4 space-y-2">
                            {question.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors duration-300 ${
                                        answer.toLocaleLowerCase() ===
                                        option.toLocaleLowerCase()
                                            ? `${
                                                  isWrong
                                                      ? "border-red-600"
                                                      : "border-blue-600"
                                              }`
                                            : "border-gray-700 hover:border-blue-400"
                                    } `}
                                    onClick={() => setAnswer(option)}
                                >
                                    <span className="text-white">{option}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 mb-4 w-full border border-green-500">
                    <h2 className="text-xl font-bold mb-4">{question.title}</h2>
                    <p className="mb-4">{question.description}</p>
                    {question.options.length === 0 ? (
                        <div className="mb-4">
                            <input
                                type="text"
                                className={`w-full bg-gray-800 text-white px-4 py-2 rounded outline-none border border-green-500`}
                                value={question.answer}
                                readOnly
                            />
                        </div>
                    ) : (
                        <div className="mb-4 space-y-2">
                            {question.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors duration-300 ${
                                        question.answer.toLocaleLowerCase() ===
                                        option.toLocaleLowerCase()
                                            ? "border-green-600"
                                            : "border-gray-700 "
                                    } `}
                                >
                                    <span className="text-white">{option}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-end pt-4 text-green-500">
                        Solved successfully !
                    </div>
                </div>
            )}
        </>
    );
};

export default Question;
