import { Input } from '@heroui/input';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import Link from 'next/link';

import { HeaderAuth } from '@/components/header-auth';

export default function Header() {
  return (
    <Navbar className="mb-6 shadow">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent className="justify-center">
        <NavbarItem>
          <Input placeholder="Search..." />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}

// NOTE: This a Header component with authentication on server side without HeaderAuth client component
// import type { ReactNode } from 'react';
// import Link from 'next/link';
// import { Avatar } from '@heroui/avatar';
// import { Button } from '@heroui/button';
// import { Input } from '@heroui/input';
// import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
// import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';

// import * as actions from '@/actions';
// import { auth } from '@/auth';

// export default async function Header() {
//   const session = await auth();

//   const authenticationContent: ReactNode = (
//     <>
//       <NavbarItem>
//         <form action={actions.signIn}>
//           <Button type="submit" color="secondary" variant="bordered">
//             Sign In
//           </Button>
//         </form>
//       </NavbarItem>
//       <NavbarItem>
//         <form action={actions.signIn}>
//           <Button type="submit" color="primary" variant="flat">
//             Sign Up
//           </Button>
//         </form>
//       </NavbarItem>
//     </>
//   );

//   return (
//     <Navbar className="mb-6 shadow">
//       <NavbarBrand>
//         <Link href="/" className="font-bold">
//           Discuss
//         </Link>
//       </NavbarBrand>
//       <NavbarContent className="justify-center">
//         <NavbarItem>
//           <Input placeholder="Search..." />
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         {session?.user ? (
//           <Popover placement="left">
//             <PopoverTrigger>
//               <Avatar className="cursor-pointer" src={session.user.image ?? ''} />
//             </PopoverTrigger>
//             <PopoverContent>
//               <div className="p-4">
//                 <form action={actions.signOut}>
//                   <Button type="submit">Sign Out</Button>
//                 </form>
//               </div>
//             </PopoverContent>
//           </Popover>
//         ) : (
//           authenticationContent
//         )}
//       </NavbarContent>
//     </Navbar>
//   );
// }
