import { useNavigate } from "react-router-dom";
import { Button, InputField, Form } from "@/shared/components/ui";
import { useLoginForm } from "@/features/auth/hooks";

export function LoginForm() {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    useLoginForm();

  const navigate = useNavigate();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        {...register("email")}
        error={errors.email?.message}
      />

      <div className="flex flex-col gap-2">
        <InputField
          label="Senha"
          type="password"
          showPasswordToggle
          {...register("password")}
          error={errors.password?.message}
        />

        <span
          className="text-sm text-right cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Esqueci minha senha
        </span>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        Entrar
      </Button>
    </Form>
  );
}
