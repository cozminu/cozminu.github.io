import React from "react";

export default function MainLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <main className="mt-6 sm:mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
        {left}
      </div>
      <aside className="relative lg:sticky lg:top-8 space-y-4 sm:space-y-6 md:space-y-8 h-fit">
        {right}
      </aside>
    </main>
  );
}
