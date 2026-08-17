import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const queryClient = new QueryClient();

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/api/authentication/login", {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      alert(
        error?.response?.data?.message ||
          "Login failed! Please check your credentials.",
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    loginMutation.mutate();
  };

  return (
    <main className="flex flex-col gap-6 justify-center items-center min-h-screen bg-muted px-10">
      <Card className="p-0 w-full max-w-sm md:max-w-4xl flex-row gap-0">
        <form
          onSubmit={handleSubmit}
          id="signUpContainer"
          className="rounded-l-xl h-full border items-center flex flex-col flex-1 p-2 md:py-4 md:px-4 gap-7 *:w-full"
        >
          <CardHeader className="flex flex-col items-center gap-3 mt-6">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Login to your Socially account</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-2 flex flex-col gap-0.75">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-xs shadow-accent py-1 px-3 rounded-[8px] h-9"
                required
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="space-y-2 flex flex-col gap-0.75">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-xs shadow-accent py-1 px-3 rounded-[8px] h-9"
                required
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="h-5 flex align-middle font-medium text-[14px]">
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full font-medium text-[14px] py-2 px-4 h-9 cursor-pointer"
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </CardContent>

          <CardContent>
            <div className="m-4">
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </form>

        <div className="hidden md:block md:flex-1 bg-muted"></div>
      </Card>

      <p className="text-center text-sm font-normal text-muted-foreground w-xs md:w-1/2">
        By clicking continue, you agree to our{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Privacy Policy
        </a>
        .
      </p>
    </main>
  );
};

const SignInPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SignInForm />
    </QueryClientProvider>
  );
};

export default SignInPage;
