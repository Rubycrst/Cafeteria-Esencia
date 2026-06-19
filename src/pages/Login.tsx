import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginForm = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setServerError("");
    const result = await signIn(data.email, data.password);
    if (result.error) {
      setServerError(result.error);
      return;
    }
    if (result.role === "admin") navigate("/admin");
    else navigate("/productos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coffee-50 to-coffee-100/50 px-6 py-20">
      <div className="w-full max-w-md animate-scale-in">
        <div className="bg-white rounded-2xl shadow-xl shadow-coffee-900/5 p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-coffee-700 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-coffee-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 21V19H20V21H2ZM20 8V5H22V11H20V10H18V13C18 14.1 17.55 15.04 16.83 15.71C16.11 16.38 15.14 16.71 14.25 16.71H9.75C8.86 16.71 7.89 16.38 7.17 15.71C6.45 15.04 6 14.1 6 13V3H18V8H20ZM8 5V13C8 13.55 8.22 14.02 8.59 14.36C8.95 14.69 9.39 14.85 9.75 14.85H14.25C14.61 14.85 15.05 14.69 15.41 14.36C15.78 14.02 16 13.55 16 13V5H8Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-coffee-900">Iniciar sesión</h1>
            <p className="text-coffee-400 mt-2">Accede a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1.5">Correo electrónico</label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                    errors.email ? "border-red-400" : "border-coffee-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                    errors.password ? "border-red-400" : "border-coffee-200"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {serverError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-coffee-700 text-white py-3.5 rounded-xl font-semibold hover:bg-coffee-800 transition disabled:opacity-50"
            >
              {isSubmitting ? "Ingresando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-coffee-400">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-gold-600 font-semibold hover:text-gold-700 transition">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
