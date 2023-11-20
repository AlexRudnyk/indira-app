"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/auth/operations";
import { useFormStatus } from "react-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Submit
    </button>
  );
}

const schema = yup.object().shape({
  name: yup.string().min(2).max(16, "Less_than_16").required("Name_required"),
  email: yup
    .string()
    .email()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Available_latin_based"
    )
    .min(5, "Atleast_5")
    .max(63, "Email_length")
    .required("Email_required"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/)
    .required("Phone_required"),
  password: yup
    .string()
    .min(7, "Atleast_7")
    .max(12, "Password_length")
    .matches(/^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>/?]*$/, "Only_latinic")
    .required("Password_required"),
});

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    isLoggedIn ? router.replace("/") : router.replace("/register");
  }, [isLoggedIn, router]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };

  const handleSubmit = async (
    {
      name,
      email,
      phone,
      password,
    }: { name: string; email: string; phone: string; password: string },
    { resetForm }: { resetForm: any }
  ) => {
    try {
      const resultSignup = await dispatch(
        signup({ name, email, phone, password })
      );

      if (resultSignup.type === "auth/signup/fulfilled") {
        await dispatch(login({ email, password }));
      }
      if (resultSignup.type === "auth/signup/rejected") {
      }
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
        <Field type="text" name="name" placeholder="John Doe" />
        <ErrorMessage name="name" />

        <Field type="text" name="phone" placeholder="+380671112233" />
        <ErrorMessage name="phone" />

        <Field type="email" name="email" placeholder="example@mail.com" />
        <ErrorMessage name="email" />

        <Field type="password" name="password" placeholder="Password" />
        <ErrorMessage name="password" />

        <SubmitButton />
      </Form>
    </Formik>
  );
};

export default RegisterForm;
