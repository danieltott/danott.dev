import clsx from 'clsx';

export function Prose({
  children,
  className,
  small,
}: {
  className?: React.HTMLAttributes<'div'>['className'];
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <div className={clsx('relative', className)}>
      <div
        className={clsx(
          'prose relative z-10 dark:prose-invert ',
          small
            ? 'prose-sm md:prose-base lg:prose-lg'
            : 'md:prose-lg  lg:prose-xl 2xl:prose-2xl'
        )}
      >
        {children}
      </div>
    </div>
  );
}
