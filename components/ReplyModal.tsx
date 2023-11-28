"use client";

import { CommentProps } from "@/types";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useFormStatus } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

interface ReplyModalProps {
  onSubmit: (values: CommentProps) => void;
  onClose: () => void;
}

const schema = yup.object().shape({
  text: yup
    .string()
    .min(5, "Should be atleast 5 characters")
    .required("comment is required"),
});

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex self-center justify-center items-center w-[150px] bg-[var(--primary)] text-white rounded-2xl py-3 px-6 outline-none shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out hover:scale-110"
    >
      Submit
    </button>
  );
}

const ReplyModal = ({ onSubmit, onClose }: ReplyModalProps) => {
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
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
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
          validationSchema={schema}
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
                  placeholder="Please enter your comment"
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