import { Container } from '@/components/Container';

export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container className="mt-8 sm:mt-16">{children}</Container>;
}
