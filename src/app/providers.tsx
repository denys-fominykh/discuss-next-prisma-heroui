import type { ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/system';
import { SessionProvider } from 'next-auth/react';

type TProvidersProps = {
  readonly children: ReactNode;
};

export function Providers({ children }: TProvidersProps) {
  return (
    <SessionProvider>
      <HeroUIProvider>{children}</HeroUIProvider>
    </SessionProvider>
  );
}
