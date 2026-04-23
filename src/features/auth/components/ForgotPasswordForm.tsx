import { useForgotPasswordForm } from "../hooks";
import { Button, InputField } from "../../../shared/components/ui";
import { Form } from "../../../shared/components/ui/form/Form";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ForgotPasswordForm() {
  const { register, handleSubmit, onSubmit, isSubmitting } =
    useForgotPasswordForm();

  const navigate = useNavigate();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        type="email"
        {...register("email", { required: "Email é obrigatório" })}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
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
