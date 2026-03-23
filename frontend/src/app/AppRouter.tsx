import { Route, Routes } from "react-router-dom";
import Dashboard from "../modules/dashboard/Dashboard";
import Sandbox from "../modules/sandbox1/Sandbox";
import Sandbox2 from "../modules/sandbox2/Sandbox2";
import Models from "../modules/models/Models";
import Health from "../modules/health/Health";
import NeuralNetworks from "../modules/nn/NeuralNetworks";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route path="health" element={<Health />} />
                <Route path="models" element={<Models />} />
                <Route path="nn" element={<NeuralNetworks />} />
                <Route path="sandbox" element={<Sandbox />} />
                <Route path="sandbox2" element={<Sandbox2 />} />
            </Route>
        </Routes>
    )
}

export default AppRouter
