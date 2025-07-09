import { LoginForm } from "@/components/pages/login-form";
import { verifyToken } from "@/lib/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("phoenix-token");
  let navigateToDashboard = false;
  try {
    await verifyToken(token?.value || "");
    // If token is valid, redirect immediately
    navigateToDashboard = true;
  } catch (error) {
    // If token is invalid, fall through and show login form
    console.log("error", error);
  }

  if (navigateToDashboard) {
    redirect("/dashboard");
  } else {
    return (
      <div className="flex min-h-screen items-center justify-center w-full">
        <LoginForm />
      </div>
    );
  }
}
