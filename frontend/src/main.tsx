import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
