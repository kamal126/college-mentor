// app/dashboard/mentor/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Page heading skeleton */}
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />

      {/* Cards skeleton */}
      <div className="grid gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
