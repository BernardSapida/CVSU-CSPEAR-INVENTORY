import UserSettings from "../../../components/account/UserSettings";
import { checkAuth } from "@/lib/auth/utils";
import { currentUser } from '@clerk/nextjs';

export default async function Account() {
  await checkAuth();
  const user = await currentUser();

  return (
    <main>
      <h1 className="text-3xl font-semibold my-6">Account</h1>
      <div className="space-y-6">
        <UserSettings user={user} />
      </div>
    </main>
  );
}
