import { HeroUIProvider } from '@heroui/system';
import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

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
