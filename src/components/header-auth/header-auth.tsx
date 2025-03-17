'use client';

import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { NavbarItem } from '@heroui/navbar';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';

import * as actions from '@/actions';

export default function HeaderAuth() {
  const session = useSession();

  const authenticationContent: ReactNode = (
    <>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button type="submit" color="secondary" variant="bordered">
            Sign In
          </Button>
        </form>
      </NavbarItem>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button type="submit" color="primary" variant="flat">
            Sign Up
          </Button>
        </form>
      </NavbarItem>
    </>
  );

  return (
    <>
      {session.status === 'loading' ? null : session.data?.user ? (
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar className="cursor-pointer" src={session.data?.user.image ?? ''} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4">
              <form action={actions.signOut}>
                <Button type="submit">Sign Out</Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        authenticationContent
      )}
    </>
  );
}
