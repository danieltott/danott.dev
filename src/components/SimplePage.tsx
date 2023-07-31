import { Prose } from './Prose';
import Title from './Title';

export type Props = {
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
};

export default function SimplePage({ title, intro, children }: Props) {
  return (
    <>
      <header className="max-w-2xl">
        <Title>{title}</Title>
        <Prose className="text-above-stars mt-6 prose-p:leading-snug">
          {typeof intro === 'string' ? <p>{intro}</p> : intro}
        </Prose>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </>
  );
}
