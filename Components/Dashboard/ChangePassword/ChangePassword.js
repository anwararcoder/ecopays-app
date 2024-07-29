"use client";
import { changeUserPassword } from "@/ReactQuery/FunctionsReactQuery";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ContextAuth } from "@/Context/contextAuth";

const ChangePassword = () => {
  let { logout } = useContext(ContextAuth);

    const initialValues = {
        currentPassword: '',
        password: '',
        passwordConfirm: '',
      };

      const validationSchema = Yup.object({
        currentPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
      });

    const useChangeUserPasswordMutation = () => {
        return useMutation({
            mutationFn: changeUserPassword,
            onSuccess: (response) => {
                toast.success("Change Password Successfully");
                toast.success("Please log in again.");
                logout()
            },
            onError: (error) => {
                if (error.response?.data?.errors) {
                    error.response.data.errors.forEach(err => {
                        toast.error(err.msg || "An error occurred");
                    });
                } else {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            },
        });
    };

    const { mutateAsync, isPending } = useChangeUserPasswordMutation();
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => await mutateAsync(values)}
      >
        {(formik) => (
          <Form>
            <div className="mb-[30px]">
              <label
                htmlFor="currentPassword"
                className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
              >
                Current Password
              </label>
              <Field
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="**************"
                className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
              />
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
              />
            </div>
            <div className="mb-[30px]">
              <label
                htmlFor="password"
                className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
              >
                New Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="**************"
                className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
              />
            </div>
            <div className="mb-[30px]">
              <label
                htmlFor="passwordConfirm"
                className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="**************"
                className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
              />
              <ErrorMessage
                name="passwordConfirm"
                component="div"
                className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
              />
            </div>
            <button
              type="submit"
              className="group w-[100%] inline-flex items-center justify-center px-[20px] py-[12px] text-[#FFF] hover:text-[#FFF] text-[14px] border-2 border-[#3D5A80] hover:border-[#98C1D9] bg-[#3D5A80] hover:bg-[#98C1D9] rounded-full uppercase font-bold"
              disabled={formik.isSubmitting || isPending}
            >
              <span>
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin inline-flex -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading....
                  </>
                ) : (
                  "Change Password"
                )}
              </span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
