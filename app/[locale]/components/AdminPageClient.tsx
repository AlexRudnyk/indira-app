"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikState } from "formik";
import * as yup from "yup";
import { AdminGoodItem, CustomBtn, ImageUpload } from ".";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addGoods } from "@/redux/goods/operations";
import { GoodProps } from "@/types";

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
  const user = useSelector((state: RootState) => state.auth.user);
  const allGoods = useSelector((state: RootState) => state.goods.goods);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const allGoodsReversed = [...allGoods].reverse();

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
    dispatch(addGoods(values));
    setDescription("");
    resetForm();
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="mo:max-w-[480px] sm:w-[480px] lg:w-[420px] md:mr-[30px] lg:mr-[50px] flex flex-col mo:mb-[50px] sm:mb-[50px] md:mb-0">
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

            <CustomBtn
              btnType="submit"
              title="Submit"
              containerStyles="bg-[var(--primary)] text-white rounded-2xl mr-3 w-[100px] self-center"
            />
          </Form>
        )}
      </Formik>
      <ul className="flex flex-col w-full">
        {allGoodsReversed.map((good: GoodProps) => (
          <AdminGoodItem key={good._id} good={good} />
        ))}
      </ul>
    </div>
  );
};

export default AdminPageClient;
