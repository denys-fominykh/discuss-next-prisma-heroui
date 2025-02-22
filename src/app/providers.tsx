'use client';

import type { ReactNode } from 'react';
import { HeroUIProvider } from '@heroui/react';

type TProvidersProps = Readonly<{
  children: ReactNode;
}>;

export function Providers({ children }: TProvidersProps) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
