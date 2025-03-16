import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LennuTabel from "./components/LennuTabel";
import LennuInfo from "./components/LennuInfo";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LennuTabel />} />
                <Route path="/lend/:id" element={<LennuInfo />} />
            </Routes>
        </Router>
    );
}

export default App;
