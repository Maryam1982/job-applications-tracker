"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/serverClient";

// SIGN-UP
export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({ email, password });

  console.log("in action, data and error", data, error);

  // Case C — actual Supabase validation error
  if (error) {
    return {
      success: false,
      error: error.message,
      alreadyExists: false,
      message: null,
    };
  }

  // Case B — Privacy case (email already registered)
  if (data.user && data?.user?.identities?.length === 0) {
    return {
      success: true,
      alreadyExists: true,
      message: "This email address may already be registered.",
    };
  }

  // Case A — real successful signup
  return {
    success: true,
    alreadyExists: false,
    message: "Account created! Please check your email to confirm.",
  };
}

//SIGN-IN
export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

//SIGN-OUT
export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/login");
}
