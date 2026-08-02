import type { Metadata } from "next";
import { OnboardingForm } from "../../components/onboarding-form";

export const metadata: Metadata = { title: "Build your learning path" };
export default function OnboardingPage() {
  return <OnboardingForm />;
}
