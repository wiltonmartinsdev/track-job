import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/job" element={<Home />} />
        </Routes>
    );
}