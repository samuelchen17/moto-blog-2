// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.tsx";
import { Flowbite } from "flowbite-react";
import flowbiteTheme from "./theme/flowbite.theme.ts";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <ThemeProvider>
        <Flowbite theme={{ theme: flowbiteTheme }}>
          <TooltipProvider>
            <div id="app-portal-root">
              <App />
            </div>
          </TooltipProvider>
        </Flowbite>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
