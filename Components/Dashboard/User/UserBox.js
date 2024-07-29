"use client";
import Loading from "@/Components/Loading/Loading";
import { getUserDetails, updateUserDetails } from "@/ReactQuery/FunctionsReactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { ContextAuth } from "@/Context/contextAuth";

const UserBox = () => {
  let { logout } = useContext(ContextAuth);

  const {
    data: userDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["UserDetails"],
    queryFn: getUserDetails,
  });

  const initialValues = {
    name: userDetails?.data.name,
    phone: userDetails?.data.phone,
    // email: userDetails?.data.email,
};

const validationSchema = Yup.object({
    name: Yup.string().required("FullName Required"),
    phone: Yup.string().required("Phone Number Required"),
});
const useUpdateUserDetailsMutation = () => {
  return useMutation({
      mutationFn: updateUserDetails,
      onSuccess: (response) => {
          toast.success("User Details Updated Successfully");
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

const { mutateAsync } = useUpdateUserDetailsMutation();

  if (isLoading) return <Loading />;
  if (error) {
    toast.error(error.response.data.message);
    logout()
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => await mutateAsync(values)}>
        {(formik) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
              <div>
                <label
                  htmlFor="name"
                  className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                >
                  Full Name
                </label>
                <Field
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Ex: Anwar Ramadan"
                  className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                >
                  Phone Number
                </label>
                <Field
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="Ex: 01212843661"
                  className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                />
              </div>
              {/* <div className="col-span-1 md:col-span-2">
                <label
                  htmlFor="email"
                  className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Ex: admin@admin.com"
                  className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                />
              </div> */}
            </div>
            <button
              type="submit"
              className="mt-[30px] group w-[100%] inline-flex items-center justify-center px-[20px] py-[12px] text-[#FFF] hover:text-[#FFF] text-[14px] border-2 border-[#3D5A80] hover:border-[#98C1D9] bg-[#3D5A80] hover:bg-[#98C1D9] rounded-full uppercase font-bold"
              // disabled={formik.isSubmitting}
            >
              <span>
                {formik.isSubmitting ? (
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
                  "Update Account"
                )}
              </span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserBox;
