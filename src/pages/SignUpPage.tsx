import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpPage = () => {
  return (
    <>
      <main className=" flex flex-col gap-6 justify-center items-center min-h-screen bg-muted">
        <Card className="p-0 md:w-[58%] min-w-[382px] flex-row gap-0 ">
          <div
            id="signUpContainer"
            className=" rounded-l-xl h-full  border  items-center flex flex-col flex-1 py-4 px-3 *:w-full p-0"
          >
            <CardHeader className="flex flex-col items-center gap-1 mt-6">
              <CardTitle className="text-2xl font-bold">
                Create your account
              </CardTitle>

              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-5">
                <div className="space-y-2 flex flex-col gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Enter your name" />
                </div>

                <div className="space-y-2 flex flex-col gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>

                <div className="space-y-2 flex flex-col gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
              <div className="mt-8">
                <Button className="w-full">Create Account</Button>{" "}
              </div>
              <div className="my-3">
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a
                    href="/sign-in"
                    className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </CardContent>
          </div>
          <div className=" hidden md:block md:flex-1  bg-muted"></div>
        </Card>

        <p className="text-center text-sm font-normal text-muted-foreground w-96 md:w-[826.4px]">
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
    </>
  );
};

export default SignUpPage;
