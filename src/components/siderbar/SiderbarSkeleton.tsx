export const SidebarSkeleton = ({ count = 3 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="w-full h-10.5 rounded-lg bg-stone-200 animate-pulse"
      />
    ))}
  </>
);
