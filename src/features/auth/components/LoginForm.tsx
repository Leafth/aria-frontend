import { Button } from "../../../shared/components/ui/button";
import { Form } from "../../../shared/components/ui/form/Form";
import { InputField } from "../../../shared/components/ui/input";
import { useLoginForm } from "../hooks/useLoginForm.tsx";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

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

      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </Form>
  );
}
