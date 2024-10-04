// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Quiz from "./Pages/Quiz";
import Register from "./Components/Register";
import Leaderboard from "./Pages/Leaderboard";

const App = () => {
    return (
        <Router>
            <div className="bg-purple-900 min-h-screen text-white font-mono">
                <Routes>
                    <Route path="/" element={<Quiz />} />
                    <Route path="/start" element={<Register />} />
                    <Route path="/quiz" element={<Quiz />} />
                    {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
