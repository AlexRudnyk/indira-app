"use client";

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useFormStatus } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

interface OrderModalProps {
  onCloseModal: () => void;
  onOrderSubmit: ({
    name,
    phone,
    email,
  }: {
    name: string;
    phone: string;
    email: string;
  }) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("orderModal");

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

const OrderModalSchema = () => {
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
  });
};

const OrderModal = ({ onCloseModal, onOrderSubmit }: OrderModalProps) => {
  const router = useRouter();
  const t = useTranslations("orderModal");

  useEffect(() => {
    const onEscClick = (e: KeyboardEvent) => {
      if (e.code === "Escape") onCloseModal();
    };

    window.addEventListener("keydown", onEscClick);

    return () => {
      window.removeEventListener("keydown", onEscClick);
    };
  }, [onCloseModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) onCloseModal();
  };

  const initialValues = {
    name: "",
    phone: "",
    email: "",
  };

  const handleSubmit = (values: {
    name: string;
    phone: string;
    email: string;
  }) => {
    onOrderSubmit(values);
    onCloseModal();
    router.push("/");
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-5"
    >
      <div className="relative w-[500px] bg-white p-12 flex justify-center items-center rounded-2xl">
        <button
          type="button"
          className="absolute top-[10px] right-[10px] p-4 rounded-full z-10"
          onClick={onCloseModal}
        >
          <AiOutlineClose />
        </button>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={OrderModalSchema()}
        >
          <Form className="flex flex-col w-full">
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

            <SubmitButton />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default OrderModal;
