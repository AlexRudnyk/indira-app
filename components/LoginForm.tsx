"use client";

import React, { FormEvent, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

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
  const ref = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    { email, password }: { email: string; password: string },
    { resetForm }: { resetForm: any }
  ) => {
    try {
      dispatch(login({ email, password }));

      resetForm();
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
