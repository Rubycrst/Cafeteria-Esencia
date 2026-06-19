import { Routes, Route } from "react-router-dom";

import Inicio from "../pages/Inicio";
import QuienesSomos from "../pages/QuienesSomos";
import Productos from "../pages/Productos";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Dashboard from "../pages/Dashboard";
import DashboardAdmin from "../pages/DashboardAdmin";

import MainLayout from "../layouts/MainLayout";
import Carrito from "../pages/Carrito";
import ProductoDetalle from "../pages/ProductoDetalle";
import Checkout from "../pages/Checkout";
import MiPerfil from "../pages/MiPerfil";

import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminRoute } from "../components/AdminRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Inicio /></MainLayout>} />
      <Route path="/quienes-somos" element={<MainLayout><QuienesSomos /></MainLayout>} />
      <Route path="/productos" element={<MainLayout><Productos /></MainLayout>} />
      <Route path="/producto/:id" element={<MainLayout><ProductoDetalle /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/registro" element={<MainLayout><Registro /></MainLayout>} />
      <Route path="/carrito" element={<MainLayout><Carrito /></MainLayout>} />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <MainLayout><MiPerfil /></MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout><Dashboard /></MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <MainLayout><Checkout /></MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <MainLayout><DashboardAdmin /></MainLayout>
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
