import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaData } from "../schemas";
//import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    if (data.email === "teste@teste.com" && data.password === "12345678") {
      //await login(data);

      navigate("/dashboard");
    } else {
      toast.error("Email ou senha inválidos");
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
