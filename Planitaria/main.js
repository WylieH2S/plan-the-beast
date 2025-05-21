import React from "./libs/react.js";
import ReactDOM from "./libs/react-dom.js";
import { Canvas } from "./modules/Canvas.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Canvas));