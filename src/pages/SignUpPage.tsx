import { useState } from "react";
import axios from "axios";

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

import type { SignUpForm } from "@/types/auth";

const SignUpPage = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://socially-nextjs-six.vercel.app/api/authentication/register",
        formData,
      );

      setSuccessMessage("Your account has been created successfully.");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;

        const message =
          typeof apiError?.error === "string"
            ? apiError.error
            : typeof apiError?.message === "string"
              ? apiError.message
              : "Registration failed. Please try again.";

        setErrorMessage(message);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted px-10">
      <Card className="flex w-full max-w-sm flex-row gap-0 p-0 md:max-w-4xl">
        <form
          id="signUpContainer"
          onSubmit={handleSubmit}
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

          {errorMessage && (
            <div className="mx-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mx-4 rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600">
              {successMessage}
            </div>
          )}

          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className="h-9 rounded-[8px] px-3 py-1 shadow-xs shadow-accent"
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="h-9 rounded-[8px] px-3 py-1 shadow-xs shadow-accent"
              />
            </div>
          </CardContent>

          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="h-9 rounded-[8px] px-3 py-1 shadow-xs shadow-accent"
              />
            </div>
          </CardContent>

          <CardContent>
            <Button
              type="submit"
              disabled={loading}
              className="h-9 w-full cursor-pointer px-4 py-2 text-[14px] font-medium"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </CardContent>

          <CardContent>
            <div className="m-4">
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="/sign-in"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  Sign in
                </a>
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
