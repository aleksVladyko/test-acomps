import React from "react";
import ReactDOM from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import router from "./router/router";
import { Provider } from "react-redux";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import store from "./store/store.js";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider dir="ltr">
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
