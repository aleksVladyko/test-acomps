import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import SpinnerOfDoom from "./components/SpinnerOfDoom";

function App() {
    return <RouterProvider router={router} fallbackElement={<SpinnerOfDoom />} />;
}

export default App;
