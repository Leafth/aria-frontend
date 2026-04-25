import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaData } from "@/features/auth/schemas";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "@/features/auth/services";

export function useLoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaData) => {
    try {
      await login(data);

      navigate("/dashboard");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || "Email ou senha inválidos"
      );
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
