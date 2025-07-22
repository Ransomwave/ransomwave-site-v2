import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl">404 | Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href="/" className="underline">
        ← Return Home
      </Link>
    </div>
  );
}
