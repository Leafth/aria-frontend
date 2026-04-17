import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button, InputField } from "../../../shared/components/ui";
import { Form } from "../../../shared/components/ui/form/Form";
import { useForgotPasswordForm } from "../hooks";

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
        className="flex gap-2 justify-center items-center text-sm text-text-primary cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ChevronLeft /> Voltar para login
      </span>
    </Form>
  );
}
