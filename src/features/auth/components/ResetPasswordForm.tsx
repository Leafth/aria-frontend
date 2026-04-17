import { Button } from "../../../shared/components/ui/button";
import { Form } from "../../../shared/components/ui/form/Form";
import { InputField } from "../../../shared/components/ui/input";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm.tsx";
import { ChevronLeft } from "lucide-react";

export function ResetPasswordForm() {
  const { register, handleSubmit, errors, onSubmit } = useResetPasswordForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Sua nova senha"
        type="password"
        showPasswordToggle
        {...register("password")}
        error={errors.password?.message}
      />

      <InputField
        label="Repita a sua nova senha"
        type="password"
        showPasswordToggle
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" className="w-full">
        Redefinir senha
      </Button>

      <span className="flex gap-2 justify-center items-center text-sm cursor-pointer">
        <ChevronLeft /> Voltar para login
      </span>
    </Form>
  );
}
