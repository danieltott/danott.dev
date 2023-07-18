import { Prose } from './Prose';

export type Props = {
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
};

export default function SimplePage({ title, intro, children }: Props) {
  return (
    <>
      <header className="max-w-2xl">
        <h1 className="font-title">
          {title}
        </h1>
        <Prose className="mt-6 prose-p:leading-snug text-above-stars">
          {typeof intro === 'string' ? <p>{intro}</p> : intro}
        </Prose>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </>
  );
}
