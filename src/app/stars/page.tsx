import StarCanvas from '@/components/StarCanvas';

export const metadata = {
  title: 'Stars',
};

export default function Page() {
  return (
    <body className="relative min-h-full overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-10 h-full w-full">
          <StarCanvas />
        </div>
    </body>
  );
}