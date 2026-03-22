import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sandbox from "./components/sandboxes/Sandbox";
import Sandbox2 from "./components/sandboxes/Sandbox2";
import Models from "./components/Models";

function AppRouter() {
    console.log("APPROUTER RENDER");
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route path="models" element={<Models />} />
                <Route path="sandbox" element={<Sandbox />} />
                <Route path="sandbox2" element={<Sandbox2 />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
