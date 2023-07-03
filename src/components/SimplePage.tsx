import { Prose } from './Prose';

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
        <h1 className="font-title">{title}</h1>
        <Prose className="mt-6">
          {typeof intro === 'string' ? <p>{intro}</p> : intro}
        </Prose>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </>
  );
}
