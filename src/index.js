import { StrictMode } from "react";
import ReactDOM from "react-dom";
import UserProvider from "./context/UserState";
import App from "./App";
import Home from "./components/pages/Home";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
  rootElement
);
