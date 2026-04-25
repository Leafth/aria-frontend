import { ChevronLeft } from "lucide-react";
import { Button, InputField } from "../../../shared/components/ui";
import { Form } from "../../../shared/components/ui/form/Form";
import { useResetPasswordForm } from "../hooks";
import { useNavigate } from "react-router-dom";

export function ResetPasswordForm() {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    useResetPasswordForm();

  const navigate = useNavigate();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Sua nova senha"
        type="password"
        showPasswordToggle
        {...register("password")}
        error={errors.password?.message}
        disabled={isSubmitting}
      />

      <InputField
        label="Repita a sua nova senha"
        type="password"
        showPasswordToggle
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        disabled={isSubmitting}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
      </Button>

      <span
        className="flex gap-2 justify-center items-center text-sm cursor-pointer"
        onClick={() => navigate("/login")}
      >
        <ChevronLeft /> Voltar para login
      </span>
    </Form>
  );
}
