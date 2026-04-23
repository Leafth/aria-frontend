import { toast } from "sonner";
import { resetPassword } from "../services/auth.service";
import type { ResetPasswordData } from "../types/auth.types";
import { resetPasswordSchema } from "../schemas";
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
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    if (!reset_password_token) {
      toast.error("Token inválido ou expirado");
      navigate("/forgot-password");
      return;
    }

    try {
      await resetPassword({
        ...data,
        reset_password_token,
      });

      toast.success("Senha redefinida com sucesso");
      navigate("/login");
    } catch {
      toast.error("Erro ao redefinir senha");
    }
  };

  return { register, handleSubmit, errors, onSubmit, isSubmitting };
}
