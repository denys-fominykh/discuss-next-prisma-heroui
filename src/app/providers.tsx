import type { ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/system';

type TProvidersProps = Readonly<{
  children: ReactNode;
}>;

export function Providers({ children }: TProvidersProps) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
