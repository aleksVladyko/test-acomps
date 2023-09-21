import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ServerAndPc from "../components/ServerAndPc";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Sidebar />}>
            <Route path="cmdb/:endpoints" element={<ServerAndPc />} />
        </Route>
    )
);
export default router;
