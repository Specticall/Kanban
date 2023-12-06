import { ReactElement } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { AppProvider } from "./context/AppContext";

export default function App(): ReactElement {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to={"home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
