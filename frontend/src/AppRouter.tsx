import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sandbox from "./components/layout/Sandbox";

function AppRouter() {
    console.log("APPROUTER RENDER");
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route path="sandbox" element={<Sandbox />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
