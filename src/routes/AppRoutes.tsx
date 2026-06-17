import { Routes, Route } from "react-router-dom";

import Inicio from "../pages/Inicio";
import Menu from "../pages/Menu";
import Productos from "../pages/Productos";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Dashboard from "../pages/Dashboard";
import DashboardAdmin from "../pages/DashboardAdmin";

import MainLayout from "../layouts/MainLayout";
import Carrito from "../pages/Carrito";
import ProductoDetalle from "../pages/ProductoDetalle";
import Checkout from "../pages/Checkout"; // 👈 IMPORTANTE

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

<<<<<<< HEAD
      {/* PRODUCTOS */}
      <Route
        path="/productos"
        element={
          <MainLayout>
            <Productos />
=======
      {/* PRODUCTO DETALLE */}
      <Route
        path="/producto/:id"
        element={
          <MainLayout>
          <ProductoDetalle />
>>>>>>> 8c6be8127ea03c17583c69d348be085acd4893b0
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

      {/* CARRITO */}
      <Route
        path="/carrito"
        element={
          <MainLayout>
            <Carrito />
          </MainLayout>
        }
      />

      {/* CHECKOUT 🧾 */}
      <Route
        path="/checkout"
        element={
          <MainLayout>
            <Checkout />
          </MainLayout>
        }
      />

    </Routes>
  );
}

export default AppRoutes;