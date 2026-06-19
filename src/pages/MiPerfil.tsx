import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../utils/supabase";

const profileSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().regex(/^\d{9}$/, "El teléfono debe tener 9 dígitos").or(z.literal("")),
});

type ProfileForm = z.infer<typeof profileSchema>;

function MiPerfil() {
  const { user, profile } = useAuth();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.full_name || "",
        phone: "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;
    setServerError("");
    setSuccess(false);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: data.fullName,
        phone: data.phone || null,
      })
      .eq("id", user.id);

    if (error) {
      setServerError(error.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-coffee-50/50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-coffee-900">Mi Perfil</h1>
          <p className="text-coffee-400 mt-1">Actualiza tus datos personales</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-8">
          <div className="flex items-center gap-5 pb-8 mb-8 border-b border-coffee-100">
            <div className="w-16 h-16 rounded-full bg-coffee-700 text-white text-2xl font-bold flex items-center justify-center">
              {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-lg font-bold text-coffee-900">{profile?.full_name || "Usuario"}</p>
              <p className="text-sm text-coffee-400">{user?.email}</p>
              <span className={`inline-block mt-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                profile?.role === "admin"
                  ? "bg-gold-100 text-gold-700"
                  : "bg-coffee-100 text-coffee-600"
              }`}>
                {profile?.role === "admin" ? "Administrador" : "Cliente"}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1.5">Nombre completo</label>
              <input
                type="text"
                placeholder="Tu nombre"
                {...register("fullName")}
                className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                  errors.fullName ? "border-red-400" : "border-coffee-200"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1.5">Teléfono</label>
              <input
                type="text"
                placeholder="999 888 777"
                {...register("phone")}
                className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                  errors.phone ? "border-red-400" : "border-coffee-200"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-1.5">Correo electrónico</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full border border-coffee-200 p-3.5 rounded-xl bg-coffee-50 text-coffee-400 cursor-not-allowed"
              />
              <p className="text-xs text-coffee-400 mt-1">El correo no se puede modificar</p>
            </div>

            {serverError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                {serverError}
              </div>
            )}

            {success && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm font-medium">
                Datos actualizados correctamente
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="w-full bg-coffee-700 text-white py-3.5 rounded-xl font-semibold hover:bg-coffee-800 transition disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MiPerfil;
