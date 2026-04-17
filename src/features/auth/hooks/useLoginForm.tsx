import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaData } from "../schemas/login.schema";
import { toast } from "sonner";

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaData) => {
    console.log("LOGIN:", data);

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
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
