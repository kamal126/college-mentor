"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorClient() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  return <p>Authentication error: {error}</p>;
}
