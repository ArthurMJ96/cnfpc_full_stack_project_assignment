import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import vitebuildbypasss from './vitebuildbypasss.css?inline';

const style = document.createElement('style');
style.innerHTML = vitebuildbypasss;
document.head.appendChild(style);

import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
