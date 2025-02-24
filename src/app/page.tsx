import { Button } from '@heroui/button';

import * as actions from '@/actions';
import { auth } from '@/auth';

export default async function HomePage() {
  const session = await auth();

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {session?.user ? <div>{JSON.stringify(session.user)}</div> : <div>Signet Out</div>}
    </div>
  );
}
