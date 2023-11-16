"use client";

import { login } from "@/actions";
import React, { useRef } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Submit
    </button>
  );
}

export const LoginForm = () => {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await login(formData);
      }}
    >
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <SubmitButton />
    </form>
  );
};

export default LoginForm;
