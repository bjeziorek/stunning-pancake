import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sandbox from "./components/layout/Sandbox";
import Sandbox2 from "./components/layout/Sandbox2";

function AppRouter() {
    console.log("APPROUTER RENDER");
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route path="sandbox" element={<Sandbox />} />
                <Route path="sandbox2" element={<Sandbox2 />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
