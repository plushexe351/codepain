import { lazy, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router";
import theme from "./config/theme";
import ProtectedRoute from "./components/protectedRoute";
import "./styles/globals.scss";
import AppLoader from "./components/AppLoader/AppLoader";

const Playground = lazy(() => import("./Pages/Playground/Playground"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<AppLoader />}>
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to="/playground" />} />
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={true}
                  redirectPath="/register"
                />
              }
            >
              <Route path="/playground" element={<Playground />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
