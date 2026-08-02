import type { Metadata } from "next";
import { AuthForm } from "../../components/auth-form";

export const metadata: Metadata = { title: "Password recovery" };
export default function ForgotPasswordPage() {
  return <AuthForm mode="forgot" />;
}

