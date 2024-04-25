import { Metadata } from "next";
import Link from "next/link";
import Logo from "../assets/logo";
import AuthForm from "../components/authentication/auth-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo width={100} height={60} color="#fff" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Start a virtuous cycle of knowledge by joining the
                management team of FORIF, Hanyang University's central
                club.&rdquo;
              </p>
              <footer className="text-sm">Jun Seong Pyo</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 h-full">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] h-full">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                운영진 로그인
              </h1>
              <p className="text-sm text-muted-foreground">
                한양대학교 학번과 비밀번호를 입력해주세요.
              </p>
            </div>
            <AuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
