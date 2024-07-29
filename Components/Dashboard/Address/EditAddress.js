"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { updateAddressDetails } from "@/ReactQuery/FunctionsReactQuery";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const EditAddress = ({ addressId, address }) => {
  const initialValues = {
    alias: address?.alias,
    details: address?.details,
    phone: address?.phone,
    city: address?.city,
    postalCode: address?.postalCode,
  };

  const validationSchema = Yup.object({
    alias: Yup.string().required("Alias Is Required"),
    details: Yup.string().required("Details Is Required"),
    phone: Yup.string().required("Phone Is Required"),
    city: Yup.string().required("City Is Required"),
    postalCode: Yup.string().required("Postal Code Is Required"),
  });

  const useUpdateAddressDetailsMutation = () => {
    return useMutation({
      mutationFn: (data) => updateAddressDetails(addressId, data),
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err) => {
            toast.error(err.msg || "An error occurred");
          });
        } else {
          const errorMessage = error.response?.data?.message || error.message;
          toast.error(errorMessage);
        }
      },
    });
  };

  const { mutateAsync: updateAddressDetailsHandel } =
    useUpdateAddressDetailsMutation();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => await updateAddressDetailsHandel(values)}
      >
        {(formik) => (
          <Form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
              <div>
                <label
                  htmlFor="alias"
                  className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                >
                  Title Address
                </label>
                <Field
                  type="text"
                  id="alias"
                  name="alias"
                  placeholder="Home"
                  className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                />
                <ErrorMessage
                  name="alias"
                  component="div"
                  className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                />
              </div>
              <div>
                <label
                  htmlFor="details"
                  className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                >
                  Address Details
                </label>
                <Field
                  type="text"
                  id="details"
                  name="details"
                  placeholder="Home"
                  className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                />
                <ErrorMessage
                  name="details"
                  component="div"
                  className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                >
                  City
                </label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Home"
                  className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                />
              </div>
              <div>
                <label
                  htmlFor="postalCode"
                  className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                >
                  Postal Code
                </label>
                <Field
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder="Home"
                  className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                />
                <ErrorMessage
                  name="postalCode"
                  component="div"
                  className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                >
                  Phone
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Home"
                  className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-[30px] group w-[100%] inline-flex items-center justify-center px-[20px] py-[12px] text-[#FFF] hover:text-[#FFF] text-[14px] border-2 border-[#3D5A80] hover:border-[#98C1D9] bg-[#3D5A80] hover:bg-[#98C1D9] rounded-full uppercase font-bold"
              disabled={formik.isSubmitting}
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
                  "Update"
                )}
              </span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditAddress;
