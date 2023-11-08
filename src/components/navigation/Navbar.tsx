import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
import UserAvatar from './UserAvatar';


import Menu from './Menu';

export default async function Navbar() {
  const { session } = await getUserAuth();
  const role = 'user';

  if (session?.user) {
    return (
      <nav className="p-2 flex flex-col transition-all duration-300 border-r-1 h-screen">
        <h1 className="font-semibold hover:opacity-75 transition-hover cursor-pointer">
          <Link href="/">CSPEAR</Link>
        </h1>
        <Menu role={role} />
        <UserAvatar />
      </nav>
    );
  } else return null;
}
