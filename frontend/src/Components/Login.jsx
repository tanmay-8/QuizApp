// src/components/Login.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });

        const data = await res.json();
        if (data.msg) {
            setError(data.msg);
            return;
        }

        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/quiz");
    };

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/quiz");
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-900 text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-purple-800">
                    Login
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 p-2 text-center">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-white p-2 rounded"
                    >
                        Login
                    </button>

                    <Link
                        to="/register"
                        className="block text-center text-purple-700 mt-4"
                    >
                        Register
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
