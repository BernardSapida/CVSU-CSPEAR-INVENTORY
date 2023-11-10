import { checkAuth } from "@/lib/auth/utils";
import { currentUser } from '@clerk/nextjs';
import UserSettings from "../../../components/admin/account/UserSettings";

export default async function Account() {
  await checkAuth();
  const user = await currentUser();

  return (
    <>
      <h1 className="text-3xl font-semibold my-6">Account</h1>
      <hr />
      <div className="space-y-6 mt-5">
        <UserSettings user={user} />
      </div>
    </>
  );
}
