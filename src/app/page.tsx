import { auth } from "@/auth";

export default async function page() {
  const session = await auth();
  if (!session) {
    return <div>You do not have access</div>; // change to show langing page
  }
  return (
    <div>
      <p>Home</p>
    </div>
  );
}
