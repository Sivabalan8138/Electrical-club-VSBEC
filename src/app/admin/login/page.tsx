import LoginForm from "@/components/LoginForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Admin Login - Electrical Club',
  description: 'Login to access the Electrical Club admin dashboard',
};

export default async function LoginPage() {
  const session = await getSession();
  
  if (session.isLoggedIn) {
    redirect('/admin');
  }

  return <LoginForm />;
}
