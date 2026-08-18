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
import { toast } from "@/components/ui/toast";
import { useRegister } from "@/hooks/use-register";
import type { SignUpFormValues } from "@/types/auth.type";
import { LucideLoader2 } from "lucide-react";
import type { SubmitEvent } from "react";
import { useState } from "react";
import { Link } from "react-router";

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpFormValues>({
    name: "",
    email: "",
    password: "",
  });

  const { mutate, isPending } = useRegister();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      return toast.add({
        type: "error",
        description: "Fields are required",
      });
    }

    if (!formData.email.includes("@")) {
      return toast.add({
        type: "error",
        description: "Email must contain @",
      });
    }

    if (formData.password.length < 8) {
      return toast.add({
        type: "error",
        description: "Password field must be at least 8 characters",
      });
    }

    mutate(formData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted px-10">
      <Card className="flex w-full max-w-sm flex-row gap-0 p-0 md:max-w-4xl">
        <form
          onSubmit={handleSubmit}
          id="signUpContainer"
          className="flex h-full flex-1 flex-col items-center gap-7 rounded-l-xl border p-2 md:px-4 md:py-4 [&>*]:w-full"
        >
          <CardHeader className="mt-6 flex flex-col items-center gap-3">
            <CardTitle className="text-2xl font-bold">
              Create your account
            </CardTitle>

            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="h-9 rounded-[8px] px-3 py-1 shadow-xs shadow-accent"
                required
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="h-9 rounded-[8px] px-3 py-1 shadow-xs shadow-accent"
                required
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="h-9 rounded-[8px] px-3 py-1 shadow-xs shadow-accent"
                required
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="flex align-middle font-medium text-[14px]">
              <Button
                type="submit"
                disabled={isPending}
                className="h-9 w-full cursor-pointer px-4 py-2 text-[14px] font-medium"
              >
                {isPending && <LucideLoader2 className="size-4 animate-spin" />}

                {isPending ? "Creating..." : "Create Account"}
              </Button>
            </div>
          </CardContent>

          <CardContent>
            <div className="m-4">
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </form>

        <div className="hidden bg-muted md:block md:flex-1" />
      </Card>

      <p className="w-xs text-center text-sm font-normal text-muted-foreground md:w-1/2">
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

export default SignUpPage;
