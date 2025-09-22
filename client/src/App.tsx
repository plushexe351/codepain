import { lazy, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router";
import theme from "./config/theme";
import ProtectedRoute from "./components/protectedRoute";
import "./styles/globals.scss";
import AppLoader from "./components/AppLoader/AppLoader";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "react-floatify";
import "react-floatify/dist/react-floatify.css";
import { toastOptions } from "./config/toastOptions";
const Playground = lazy(() => import("./Pages/Playground/Playground"));
// import Login from "./Pages/Login/Login";
// import Register from "./Pages/Register/Register";
const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider position={toastOptions.position}>
        <AuthProvider>
          <Suspense fallback={<AppLoader />}>
            <div className="app">
              <Routes>
                <Route path="/" element={<Navigate to="/playground" />} />
                <Route element={<ProtectedRoute redirectPath="/register" />}>
                  <Route path="/playground" element={<Playground />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Suspense>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
