import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="grid place-items-center pt-4">
      <SignUp redirectUrl={'https://www.facebook.com/messages/t/6742281392516756'} />
    </main>
  );
}