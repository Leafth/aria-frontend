import { Button } from "../../../shared/components/ui/button";
import { Form } from "../../../shared/components/ui/form/Form";
import { InputField } from "../../../shared/components/ui/input";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginForm() {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

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

        <span className="text-sm text-right cursor-pointer">
          Esqueci minha senha
        </span>
      </div>

      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </Form>
  );
}
