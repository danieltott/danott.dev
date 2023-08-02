import SimplePage from '@/components/SimplePage';

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SimplePage
        title="Writing on full-stack design &amp; development."
        intro="All of my long-form thoughts on front-end, full-stack, design, development, and more, collected in chronological order since 2007."
      >
        {children}
      </SimplePage>
    </>
  );
}
