import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Store } from "./RTK/Store";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={Store}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </Provider>
    </React.StrictMode>
);
