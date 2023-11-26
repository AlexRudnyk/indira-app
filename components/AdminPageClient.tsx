"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikState } from "formik";
import * as yup from "yup";
import { CustomBtn, ImageUpload } from ".";
import { useRouter } from "next/navigation";
import { UserProps } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface InitialStateProps {
  title: string;
  text: string;
  description: string;
  photoURL: string;
  price: number;
}

interface ResetFormProps {
  resetForm: (nextState?: Partial<FormikState<InitialStateProps>>) => void;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .min(2)
    .max(30, "Should be less then 30 characters")
    .required("Title is required"),
  text: yup
    .string()
    .min(5, "Should be atleast 5 characters")
    .required("Text is required"),
  photoURL: yup.string().required("Photo is required"),
  price: yup.number().required("Price is required"),
});

const AdminPageClient = () => {
  const [description, setDescription] = useState<string>("");
  const user: UserProps = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    user.role !== "admin" ? router.replace("/") : router.replace("/admin");
  }, [router, user.role]);

  const initialValues: InitialStateProps = {
    title: "",
    text: "",
    description: "",
    photoURL: "",
    price: 0,
  };

  const handleSubmit = (
    values: InitialStateProps,
    { resetForm }: ResetFormProps
  ) => {
    console.log("VALUES", values);
    // dispatch(addGoods(values));
    setDescription("");
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <ImageUpload setFieldValue={setFieldValue} />
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
                className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
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

            <CustomBtn
              btnType="submit"
              title="Submit"
              containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3"
            />
          </Form>
        )}
      </Formik>
      <ul></ul>
    </div>
  );
};

export default AdminPageClient;
