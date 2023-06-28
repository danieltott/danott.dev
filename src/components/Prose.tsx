import clsx from 'clsx';

export function Prose({
  children,
  className,
}: {
  className?: React.HTMLAttributes<'div'>['className'];
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        className,
        'prose dark:prose-invert  md:prose-lg lg:prose-xl'
      )}
    >
      {children}
    </div>
  );
}
