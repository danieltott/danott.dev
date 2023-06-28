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
        <h1 className="font-title text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 md:text-lg lg:text-xl">
          {intro}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </>
  );
}
