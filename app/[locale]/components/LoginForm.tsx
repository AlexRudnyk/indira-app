"use client";

import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { login } from "@/redux/auth/operations";
import { useRouter } from "../../../navigation";
import { useTranslations } from "next-intl";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("loginForm");

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex self-center justify-center items-center w-[150px] bg-[var(--primary)] text-white rounded-2xl py-3 px-6 outline-none shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out hover:scale-110"
    >
      {t("submit")}
    </button>
  );
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Available_latin_based"
    )
    .min(5, "Atleast_5")
    .max(63, "Email_length")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Atleast_7")
    .max(12, "Password_length")
    .matches(/^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>/?]*$/, "Only_latinic")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const t = useTranslations("loginForm");

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
      <Form className="flex flex-col w-[400px] p-6 rounded-2xl shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] bg-white">
        <div className="relative">
          <Field
            type="email"
            name="email"
            placeholder="example@mail.com"
            className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
          />
          <div className="absolute top-10 text-red-600">
            <ErrorMessage name="email" />
          </div>
        </div>

        <div className="relative">
          <Field
            type="password"
            name="password"
            placeholder={t("password")}
            className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
          />
          <div className="absolute top-10 text-red-600">
            <ErrorMessage name="password" />
          </div>
        </div>

        <SubmitButton />
      </Form>
    </Formik>
  );
};

export default LoginForm;
