import React from "react";
import ReactDOM from "react-dom";
import Theme from "./Style/Theme";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./Router/App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "./Style/GlobalStyles";
import "core-js/stable";
import "regenerator-runtime/runtime";

const queryClient = new QueryClient();

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
        <ToastContainer
            position="bottom-left"
            closeOnClick
            newestOnTop={true}
            pauseOnFocusLoss={false}
        />
        <GlobalStyles />
    </ThemeProvider>,
    document.getElementById("root")
);
