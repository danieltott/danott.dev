import { Container } from '@/components/Container';
import type { Props } from './SimplePage';
import SimplePage from './SimplePage';

export function SimpleLayout(props: Props) {
  return (
    <Container className="mt-16 sm:mt-32">
      <SimplePage {...props} />
    </Container>
  );
}
