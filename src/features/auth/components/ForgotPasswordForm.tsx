import { Button } from "../../../shared/components/ui/button";
import { Form } from "../../../shared/components/ui/form/Form";
import { InputField } from "../../../shared/components/ui/input";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export function ForgotPasswordForm() {
  const { register, handleSubmit, errors, onSubmit } = useForgotPasswordForm();

  const navigate = useNavigate();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Informe o e-mail da sua conta"
        {...register("email")}
        error={errors.email?.message}
      />

      <Button type="submit" className="w-full">
        Recuperar senha
      </Button>

      <span
        className="flex gap-2 justify-center items-center text-sm cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ChevronLeft /> Voltar para login
      </span>
    </Form>
  );
}
