import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import "./index.less";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
