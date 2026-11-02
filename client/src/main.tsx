import { createRoot } from "react-dom/client";
import App from "./App";
import { SiteProvider } from "./site-context";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <SiteProvider>
    <App />
  </SiteProvider>
);
