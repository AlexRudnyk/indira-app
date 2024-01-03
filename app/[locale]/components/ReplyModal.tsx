"use client";

import { CommentProps } from "@/types";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useFormStatus } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslations } from "next-intl";

interface ReplyModalProps {
  onSubmit: (values: CommentProps) => void;
  onClose: () => void;
}

const ReplyModalSchema = () => {
  const t = useTranslations("errors");

  return yup.object().shape({
    text: yup.string().min(5, t("atleast_5")).required(t("commentRequired")),
  });
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("replyModal");

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

const ReplyModal = ({ onSubmit, onClose }: ReplyModalProps) => {
  const t = useTranslations("replyModal");

  useEffect(() => {
    const onEscClick = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };

    window.addEventListener("keydown", onEscClick);

    return () => {
      window.removeEventListener("keydown", onEscClick);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  const handleSubmit = (values: CommentProps) => {
    onSubmit(values);
    onClose();
  };

  const initialValues = {
    text: "",
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
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        <Formik
          initialValues={initialValues}
          validationSchema={ReplyModalSchema()}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="w-full flex flex-col">
              <div className="relative">
                <Field
                  as="textarea"
                  type="text"
                  name="text"
                  className="p-2 mb-[30px] border-b-2 border-gray-300 w-full resize-none"
                  placeholder={t("comment")}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFieldValue("text", e.currentTarget.value);
                  }}
                />
                <div className="absolute top-10 text-red-600">
                  <ErrorMessage name="text" />
                </div>
              </div>
              <SubmitButton />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ReplyModal;
