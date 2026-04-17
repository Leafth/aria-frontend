import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { resetPasswordSchema, type ResetPasswordSchemaData } from "../schemas";
import { toast } from "sonner";
import { ToastContent } from "../../../shared";

export function useResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: ResetPasswordSchemaData) => {
    console.log("RESET:", data);

    toast.custom(() => (
      <ToastContent
        title="Senha redefinida!"
        description="Agora você já pode fazer login"
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
