import React from "react";
import ReactDOM from "react-dom/client";
import "@assets/styles/index.css";
import { App } from "./App";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement // ✅ 쉼표 제거
);
root.render(
    <React.StrictMode>
        <BrowserRouter>

            <App />
        </BrowserRouter>
    </React.StrictMode>
);
