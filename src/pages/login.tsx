import { useState } from "react";
import { Spinner } from "@radix-ui/themes";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
  SignInIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../components/Layouts/AuthLayout";
import { useAuth } from "../components/Context";
import { CustomInput } from "../components/Inputs";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().min(8, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (isAuthenticated) {
    navigate("/home");
    return;
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsSignIn(true);

    try {
      await login(data.email, data.password);
      navigate("/home");
    } catch (err: any) {
      let errorMessage = "Ocorreu um erro ao realizar essa solicitação";
      if (err.code === "auth/invalid-credential") {
        errorMessage = "Email ou senha inválidos.";
      }
      toast.error(errorMessage);
    } finally {
      setIsSignIn(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md bg-zinc-800 p-6 md:p-10 rounded-lg"
      >
        <div className="space-y-2">
          <h2 className="text-white text-2xl font-semibold tracking-wider">
            Synapse
          </h2>
          <div className="left-0 bottom-[-10px] w-28 h-1 bg-purple-400"></div>
        </div>
        <div className="space-y-4">
          <div className="w-full space-y-2">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  icon={<EnvelopeIcon size={20} weight="duotone" />}
                  type="email"
                  placeholder="Email"
                  maxLength={50}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full space-y-2">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  icon={<LockIcon size={20} weight="duotone" />}
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  maxLength={20}
                  secondIcon={
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
                    >
                      {showPassword ? (
                        <EyeSlashIcon size={20} weight="duotone" />
                      ) : (
                        <EyeIcon size={20} weight="duotone" />
                      )}
                    </span>
                  }
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={isSignIn}
            className={`flex items-center justify-between gap-3 w-full px-5 py-2 rounded-lg font-semibold bg-white text-black mb-5 ${
              isSignIn ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Login
            <div className="flex items-center gap-2">
              {isSignIn && <Spinner loading={true} size="2" />}
              <SignInIcon size={24} weight="duotone" />
            </div>
          </button>
        </div>
        <p className="text-white mt-sm">
          Esqueceu a senha?{" "}
          <a href="/forgotPassword" className="font-semibold text-white">
            Clique aqui
          </a>
        </p>
        <div className="mt-20">
          <p className="text-white mt-sm">
            <a href="/signup" className="font-semibold text-white">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
