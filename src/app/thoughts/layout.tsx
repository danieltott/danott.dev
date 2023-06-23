import { Container } from '@/components/Container';

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container className="mt-16 sm:mt-32">{children}</Container>;
}
