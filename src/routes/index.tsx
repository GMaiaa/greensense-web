import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Trash from "../pages/Trash";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import AllNotifications from '../pages/AllNotifications';
import { PrivateRoute } from "./privateRoutes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Rota pública */}
        <Route path="/" element={<Login />} />

        {/* 🔐 Rotas privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/trashes"
          element={
            <PrivateRoute>
              <Trash />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <AllNotifications />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
