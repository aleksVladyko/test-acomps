import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Cmdb from "../components/Cmdb";
import ServerAndPc from "../components/ServerAndPc";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Sidebar />}>
            <Route path="cmdb" element={<Cmdb />} />
            <Route path="cmdb/:endpoints" element={<ServerAndPc />} />
        </Route>
    )
);
export default router;
