import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { RouterProvider } from "react-router";
import router from "@/routes/routes.tsx";
import outputs from "@/../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { Provider } from "react-redux";
import { store } from "./toolkit/store";
import { ThemeProvider } from "@/components/theme-provider";
import { AmplifyHubEvents } from "./components/AmplifyHubEvents";
import "@/utils/i18n";
import { DynamicBackground } from "./components/background";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <Provider store={store}>
        {/* This is a custom component that listens to Hub events */}
        <AmplifyHubEvents />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <DynamicBackground />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </Authenticator.Provider>
  </React.StrictMode>
);
