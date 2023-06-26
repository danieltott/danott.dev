import { SimplePage } from '@/components/SimplePage';

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SimplePage
        title="Writing on full-stack design and development."
        intro="All of my long-form thoughts on front-end, full-stack, design, development, and more, collected in chronological order since 2007."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">{children}</div>
        </div>
      </SimplePage>
    </>
  );
}
