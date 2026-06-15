import { Routes, Route } from "react-router-dom";

import Inicio from "../pages/Inicio";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Dashboard from "../pages/Dashboard";
import DashboardAdmin from "../pages/DashboardAdmin";

import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Inicio />
          </MainLayout>
        }
      />

      {/* MENU */}
      <Route
        path="/menu"
        element={
          <MainLayout>
            <Menu />
          </MainLayout>
        }
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      {/* REGISTRO */}
      <Route
        path="/registro"
        element={
          <MainLayout>
            <Registro />
          </MainLayout>
        }
      />

      {/* DASHBOARD USUARIO */}
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />

      {/* DASHBOARD ADMIN */}
      <Route
        path="/admin"
        element={
          <MainLayout>
            <DashboardAdmin />
          </MainLayout>
        }
      />

    </Routes>
  );
}

export default AppRoutes;