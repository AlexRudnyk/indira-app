"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikState } from "formik";
import * as yup from "yup";
import { AdminGoodItem, CustomBtn, ImageUpload } from ".";
import { useRouter } from "@/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addGoods } from "@/redux/goods/operations";
import { GoodProps } from "@/types";
import { useTranslations } from "next-intl";

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

const AdminPageSchema = () => {
  const t = useTranslations("errors");

  return yup.object().shape({
    title: yup
      .string()
      .min(2)
      .max(30, t("less_30"))
      .required(t("titleRequired")),
    text: yup.string().min(5, t("atleast_5")).required(t("textRequired")),
    photoURL: yup.string().required(t("photoRequired")),
    price: yup.number().required(t("priceRequired")),
  });
};

const AdminPageClient = () => {
  const [description, setDescription] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user);
  const allGoods = useSelector((state: RootState) => state.goods.goods);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const allGoodsReversed = [...allGoods].reverse();
  const t = useTranslations("adminPage");

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
        validationSchema={AdminPageSchema()}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="mo:max-w-[480px] sm:w-[480px] lg:w-[420px] md:mr-[30px] lg:mr-[50px] flex flex-col mo:mb-[50px] sm:mb-[50px] md:mb-0">
            <ImageUpload setFieldValue={setFieldValue} />
            <div className="relative">
              <Field
                type="text"
                name="title"
                placeholder={t("title")}
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
                placeholder={t("text")}
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
                placeholder={t("description")}
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
                placeholder={t("price")}
                className="p-2 mb-[30px] border-b-2 border-gray-300 w-full"
              />
              <div className="absolute top-10 text-red-600">
                <ErrorMessage name="price" />
              </div>
            </div>

            <CustomBtn
              btnType="submit"
              title={t("submit")}
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
