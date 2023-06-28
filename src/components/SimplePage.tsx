export function SimplePage({
  title,
  intro,
  children,
}: {
  title: React.ReactNode;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 md:text-lg lg:text-xl">
          {intro}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </>
  );
}
