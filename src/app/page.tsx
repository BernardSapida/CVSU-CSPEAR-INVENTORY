'use client'

import { trpc } from '@/lib/trpc/client';
import { UserContext } from '@/store/UserContext';
import { useRouter } from 'next-nprogress-bar';
import Link from "next/link";
import { useContext, useEffect } from 'react';

export default function Home() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  console.log(userContext);

  return (
    <main className="space-y-6">
      {/* <Link href="/account">
        <button className="text-center hover:bg-slate-100 border border-slate-200 px-3.5 py-2.5 font-medium text-sm rounded-md">Account and Billing</button>
      </Link>
      <pre className="bg-slate-100 dark:bg-slate-800 p-4">
        {JSON.stringify(userAuth, null, 2)}
        <DataContainer />
      </pre> */}
    </main>
  );
}
