import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPasswordSchema, type ResetPasswordSchemaData } from "../schemas";

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
      <div className="bg-white rounded-2xl shadow-lg px-6 py-4 flex flex-col gap-1 w-96">
        
        <span className="text-green-600 font-semibold">
          Senha redefinida!
        </span>

        <span className="text-gray-500 text-sm">
          Agora você já pode fazer login
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
