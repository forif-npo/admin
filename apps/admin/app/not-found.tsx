import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center">
      <div className="rounded-lg bg-primary-foreground p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold text-destructive">404</h1>
        <p className="">
          Oops! The page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded bg-primary-foreground px-4 py-2 font-semibold"
        >
          Go back to Home{" "}
        </Link>
      </div>
    </div>
  );
}
