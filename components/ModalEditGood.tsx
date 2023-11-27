"use client";

import { EditGoodProps, GoodProps } from "@/types";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useFormStatus } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

interface ModalEditGoodProps {
  good: GoodProps;
  onSubmit: (values: EditGoodProps) => void;
  onClose: () => void;
}

const schema = yup.object().shape({
  title: yup.string().min(2).max(30, "Should be less then 30 characters"),
  text: yup.string().min(5, "Should be atleast 5 characters"),
  description: yup.string().min(5, "Should be atleast 5 characters"),
  photoURL: yup.string(),
  price: yup.number(),
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

const ModalEditGood = ({ good, onClose, onSubmit }: ModalEditGoodProps) => {
  const [description, setDescription] = useState<string>(good.description);

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

  const handleSubmit = (values: EditGoodProps) => {
    onSubmit(values);
    onClose();
  };

  const initialValues = {
    id: good._id,
    title: good.title,
    text: good.text,
    description: description,
    photoURL: good.photoURL,
    price: good.price,
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
            <Form className="w-[300px] mr-[100px]">
              <div className="relative">
                <Field
                  type="text"
                  name="title"
                  placeholder="Please enter a title"
                  className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
                />
                <div className="absolute top-10 text-red-600">
                  <ErrorMessage name="title" />
                </div>
              </div>
              <div className="relative">
                <Field
                  type="text"
                  name="text"
                  placeholder="Please enter a text"
                  className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
                />
                <div className="absolute top-10 text-red-600">
                  <ErrorMessage name="text" />
                </div>
              </div>
              <div className="relative">
                <Field
                  as="textarea"
                  value={description}
                  type="text"
                  name="description"
                  className="p-2 mb-[30px] border-b-2 border-gray-300 w-full resize-none"
                  placeholder="Please enter description"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFieldValue("description", e.currentTarget.value);
                    setDescription(e.currentTarget.value);
                  }}
                />
                <div className="absolute top-10 text-red-600">
                  <ErrorMessage name="description" />
                </div>
              </div>

              <div className="relative">
                <Field
                  type="number"
                  name="price"
                  placeholder="Please enter a price"
                  className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
                />
                <div className="absolute top-10 text-red-600">
                  <ErrorMessage name="price" />
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

export default ModalEditGood;
