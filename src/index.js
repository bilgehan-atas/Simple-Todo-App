import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ItemsProvider } from "./store/items-context";
import { UiProvider } from "./store/ui-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ItemsProvider>
      <UiProvider>
        <App />
      </UiProvider>
    </ItemsProvider>
  </React.StrictMode>
);
