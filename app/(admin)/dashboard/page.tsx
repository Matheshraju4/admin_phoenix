import Dashboard from "@/components/pages/dashboard";
import { verifyToken } from "@/lib/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("phoenix-token");
  let navigateToLogin = true;

  try {
    await verifyToken(token?.value || "");
    navigateToLogin = false;
  } catch (error) {
    console.log("error", error);
  }

  if (navigateToLogin) {
    redirect("/");
  }

  return <Dashboard />;
}

export default DashboardPage;
