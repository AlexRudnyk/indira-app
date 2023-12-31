"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormStatus } from "react-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { login, signup } from "@/redux/auth/operations";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("registerForm");

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

const RegisterSchema = () => {
  const t = useTranslations("errors");

  return yup.object().shape({
    name: yup
      .string()
      .min(2, t("atleast_2"))
      .max(16, t("less_16"))
      .required(t("nameRequired")),
    email: yup
      .string()
      .email()
      .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, t("latin"))
      .min(5, t("atleast_5"))
      .max(63, t("less_63"))
      .required(t("emailRequired")),
    phone: yup
      .string()
      .matches(/^\+380\d{9}$/)
      .required(t("phoneRequired")),
    password: yup
      .string()
      .min(7, t("atleast_7"))
      .max(12, t("less_12"))
      .matches(/^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>/?]*$/, t("latin"))
      .required(t("passwordRequired")),
  });
};

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const t = useTranslations("registerForm");

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
      validationSchema={RegisterSchema()}
    >
      <Form className="flex flex-col w-[400px] p-6 rounded-2xl shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] bg-white">
        <div className="relative">
          <Field
            type="text"
            name="name"
            placeholder={t("name")}
            className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
          />
          <div className="absolute top-10 text-red-600">
            <ErrorMessage name="name" />
          </div>
        </div>

        <div className="relative">
          <Field
            type="text"
            name="phone"
            placeholder="+380671112233"
            className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
          />
          <div className="absolute top-10 text-red-600">
            <ErrorMessage name="phone" />
          </div>
        </div>

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

export default RegisterForm;
