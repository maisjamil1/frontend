import { useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { FC } from "react";
import useAuthStore from "@/store/authStore";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formTitle, setFormTitle] = useState<"Login" | "Signup">("Signup");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, signIn } = useAuthStore(({ signUp, signIn }) => ({
    signUp,
    signIn,
  }));

  const toggleForm = () =>
    setFormTitle((prevTitle) => (prevTitle === "Login" ? "Signup" : "Login"));
  const buttonText = formTitle === "Login" ? "Login" : "Signup";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const action = formTitle === "Login" ? signIn : signUp;
    action({
      email,
      password,
      onSuccess: () => {
        toast({
          title: "Success",
          description: `You are successfully ${buttonText.toLowerCase()}ed.`,
        });
        navigate("/");
      },
      onError: () =>
        toast({ title: "Error", description: "An error occurred" }),
    });
  };

  return (
    <Container className="h-screen flex flex-col items-center mt-20 gap-8">
      <div className="flex items-center justify-center">
        <img width="60" src={logo} alt="Logo" />
        <h1 className="bold text-3xl p-4">tmatem plus</h1>
      </div>

      <form
        className="p-16 border rounded-2xl w-[90%] md:w-[28rem] flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="text-center font-semibold">{formTitle}</div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a
          href="#toggleForm"
          className="underline text-sm"
          onClick={(e) => {
            e.preventDefault();
            toggleForm();
          }}
        >
          {formTitle === "Login"
            ? "Create an account, Sign Up"
            : "Already have an account? Sign in"}
        </a>
        <Button
          type="submit"
          className="py-6 bg-[#00805A] hover:bg-[#00805A79]"
        >
          {buttonText}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
