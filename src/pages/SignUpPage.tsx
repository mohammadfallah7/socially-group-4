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

const SignUpPage = () => {
  return (
    <main className="flex flex-col gap-6 justify-center items-center min-h-screen bg-muted px-10">
      <Card className="p-0 w-full max-w-sm md:max-w-4xl flex-row gap-0">
        <div
          id="signUpContainer"
          className=" rounded-l-xl h-full  border  items-center flex flex-col flex-1 p-2 md:py-4 md:px-4 gap-7 *:w-full"
        >
          <CardHeader className="flex flex-col items-center gap-3 mt-6">
            <CardTitle className="text-2xl font-bold">
              Create your account
            </CardTitle>

            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-2 flex flex-col gap-0.75">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="shadow-xs shadow-accent py-1 px-3 rounded-[8px] h-9"
              />
            </div>
          </CardContent>
          <CardContent>
            <div className="space-y-2 flex flex-col gap-0.75">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className=" shadow-xs shadow-accent py-1 px-3 rounded-[8px] h-9"
              />
            </div>
          </CardContent>
          <CardContent>
            <div className="space-y-2 flex flex-col gap-0.75">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className=" shadow-xs shadow-accent py-1 px-3 rounded-[8px] h-9"
              />
            </div>
          </CardContent>
          <CardContent>
            <div className="  h-5 flex align-middle font-medium text-[14px]">
              <Button className="w-full font-medium text-[14px] py-2 px-4 h-9 cursor-pointer">
                Create Account
              </Button>
            </div>
          </CardContent>
          <CardContent>
            <div className="m-4">
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

export default SignUpPage;
