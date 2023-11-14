import { currentUser } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="space-y-6">
      <h1>Hello</h1>
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
