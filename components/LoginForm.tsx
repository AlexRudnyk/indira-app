"use client";

import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { login } from "../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Submit
    </button>
  );
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    .min(5, "Atleast_5")
    .max(63, "Email_length")
    .required("Email_required"),
  password: yup
    .string()
    .min(7, "Atleast_7")
    .max(12, "Password_length")
    .matches(/^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>/?]*$/, "Only_latinic")
    .required("Password_required"),
});

export const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    isLoggedIn ? router.replace("/") : router.replace("/login");
  }, [isLoggedIn, router]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    { email, password }: { email: string; password: string },
    { resetForm }: { resetForm: any }
  ) => {
    try {
      resetForm();
      await dispatch(login({ email, password }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <Field type="email" name="email" placeholder="example@mail.com" />
        <ErrorMessage name="email" />

        <Field type="password" name="password" placeholder="Password" />
        <ErrorMessage name="password" />

        <SubmitButton />
      </Form>
    </Formik>
  );
};

export default LoginForm;
