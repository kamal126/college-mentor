"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const error = useSearchParams()?.get("error");

  return <p>Authentication error: {error}</p>;
}
