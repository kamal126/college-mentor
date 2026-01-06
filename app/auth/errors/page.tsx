import { Suspense } from "react";
import ErrorClient from "./ErrorClient";

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<p>Loading error...</p>}>
      <ErrorClient />
    </Suspense>
  );
}
