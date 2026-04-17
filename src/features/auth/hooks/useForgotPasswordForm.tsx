import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaData,
} from "../schemas/forgotPassword.schema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
      <div className="bg-white rounded-2xl shadow-lg px-6 py-4 flex flex-col gap-1">
        
        <span className="text-green-600 font-semibold">
          Sucesso!
        </span>

        <span className="text-gray-500 text-sm">
          Enviamos o link de recuperação para o seu e-mail
        </span>

      </div>
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
