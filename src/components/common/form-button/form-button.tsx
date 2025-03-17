import { Button } from '@heroui/button';
import { type ReactNode } from 'react';

type TFormButtonProps = Readonly<{
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}>;

export default function FormButton({
  children,
  isLoading = false,
  disabled = false,
}: TFormButtonProps) {
  return (
    <Button type="submit" isLoading={isLoading} disabled={disabled}>
      {children}
    </Button>
  );
}
