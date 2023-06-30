import clsx from 'clsx';

export function Prose({
  children,
  className,
}: {
  className?: React.HTMLAttributes<'div'>['className'];
  children: React.ReactNode;
}) {
  return (
    <div className={clsx('relative', className)}>
      <div className="absolute inset-0 z-0 bg-white/50 dark:bg-stone-900/50" />
      <div className="prose relative z-10 dark:prose-invert md:prose-lg  lg:prose-xl 2xl:prose-2xl">
        {children}
      </div>
    </div>
  );
}
