import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaData,
} from "../schemas";
import { ToastContent } from "../../../shared";

export function useForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: ForgotPasswordSchemaData) => {
    console.log("RECUPERAR:", data);

    toast.custom(() => (
      <ToastContent
        title="Sucesso!"
        description="Enviamos o link de recuperação para o seu e-mail"
        variant="success"
      />
    ));

    navigate("/login");
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
