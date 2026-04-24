import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaData,
} from "../schemas";
import { ToastContent } from "../../../shared";
import { forgotPassword } from "../services/auth.service";

export function useForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchemaData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: ForgotPasswordSchemaData) => {
    try {
      await forgotPassword(data.email);

      toast.custom(() => (
        <ToastContent
          title="Sucesso!"
          description="Enviamos um e-mail para recuperação de senha"
          variant="success"
        />
      ));

      navigate("/login");
    } catch {
      toast.custom(() => (
        <ToastContent
          title="Erro"
          description="Erro ao solicitar recuperação de senha"
          variant="error"
        />
      ));
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
  };
}