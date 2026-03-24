import { Route, Routes } from "react-router-dom";
import Sandbox from "../modules/sandbox1/pages/Sandbox";
import Sandbox2 from "../modules/sandbox2/pages/Sandbox2";
import Health from "../modules/health/pages/Health";
import NeuralNetworks from "../modules/nn/pages/NeuralNetworks";
import {Models} from "@/modules/models";
import { Dashboard } from "@/modules/dashboard";

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
