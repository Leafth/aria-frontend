import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaData } from "../schemas";

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
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
