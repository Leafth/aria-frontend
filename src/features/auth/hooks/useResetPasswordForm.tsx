import { toast } from "sonner";
import { resetPassword } from "../services/auth.service";
import type { ResetPasswordData } from "../types/auth.types";
import { resetPasswordSchema, type ResetPasswordSchemaData } from "../schemas";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

export function useResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reset_password_token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchemaData) => {
    if (!reset_password_token) {
      toast.error("Token inválido ou expirado");
      navigate("/forgot-password");
      return;
    }

    try {
      const payload: ResetPasswordData = {
        password: data.password,
        password_confirmation: data.confirmPassword,
        reset_password_token,
      };

      await resetPassword(payload);

      toast.success("Senha redefinida com sucesso");
      navigate("/login");
    } catch {
      toast.error("Erro ao redefinir senha");
    }
  };

  return { register, handleSubmit, errors, onSubmit, isSubmitting };
}
