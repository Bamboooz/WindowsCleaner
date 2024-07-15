import React from "react";
import ReactDOM from "react-dom/client";
import { invoke } from "@tauri-apps/api";

import App from "./App";

import "./styles.css";

window.onload = async () => {
    const isDark = await invoke("is_dark_theme");

    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
};


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
