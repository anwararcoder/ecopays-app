"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { ContextAuth } from "@/Context/contextAuth";
import { API, loginUser, signUpUser } from "@/ReactQuery/FunctionsReactQuery";
import toast from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import logInBackground from "@/public/images/login/login-bg.jpg";
import Link from "next/link";
import { storage } from "@/Utilities/LocalStorage/localStorageContainer";

const Register = () => {
    const router = useRouter();
    const { login, isLogged } = useContext(ContextAuth);
    const queryClient = new QueryClient();

    const initialValues = {
        name: "",
        phone: "",
        email: "",
        password: "",
        passwordConfirm: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("FullName Required"),
        phone: Yup.string().required("Phone Number Required"),
        email: Yup.string().email("Invalid email format").required("Email Required"),
        password: Yup.string().required("Password Required"),
        passwordConfirm: Yup.string().required("Confirm Password Required"),
    });

    const useRegisterMutation = () => {
        return useMutation({
            mutationFn: signUpUser,
            onSuccess: (response) => {
                storage.set("DataUser", { token: response.token });
                API.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
                queryClient.invalidateQueries({ queryKey: ["Users"] });
                login(response);
                toast.success("Registration Successfully");
                router.push("/dashboard");
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

    const { mutateAsync, isPending } = useRegisterMutation();

    useEffect(() => {
        if (isLogged) {
            router.push("/dashboard");
        }
    }, [isLogged, router]);

    return (
        <section className="p-[30px] min-h-[100vh] flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-[30px]">
                <div className="flex items-center lg:col-span-2">
                    <div className="w-[100%] h-[100%]">
                        <div
                            className="min-h-[600px] h-[100%] rounded-[10px] bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${logInBackground.src})` }}
                        ></div>
                    </div>
                </div>
                <div className="flex items-center lg:col-span-3">
                    <div className="mx-auto w-[100%] lg:w-[100%] p-[0px] sm:p-[30px] lg:p-[50px]">
                        <div className="mb-[30px]">
                            <h1 className="text-[24px] md:text-[35px] lg:text-[30px] font-bold leading-[1.4] capitalize">
                                Sign Up 👋
                            </h1>
                            <p className="text-gray-500 text-base font-normal leading-[27px] mt-[18px]">
                                If you have an account, sign in with your username or email address.
                            </p>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => await mutateAsync(values)}
                        >
                            {(formik) => (
                                <Form>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                                            >
                                                FullName
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
                                        <div className="col-span-1 md:col-span-2">
                                            <label
                                                htmlFor="email"
                                                className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                                            >
                                                Email
                                            </label>
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Ex: admin@admin.com"
                                                className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="text-[#3D5A80] text-base font-[700] leading-none tracking-tight pr-[15px] mb-[12px] block"
                                            >
                                                Password
                                            </label>
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Ex: At least 6 characters"
                                                className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                                            />
                                        </div>
                                        <div>
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
                                                placeholder="Ex: At least 6 characters"
                                                className="h-[50px]  w-[100%] leading-[50px] border-[2px] border-[#98C1D9]/20 hover:border-[#98C1D9] focus:border-[#98C1D9] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#98C1D9]/20 px-[15px]"
                                            />
                                            <ErrorMessage
                                                name="passwordConfirm"
                                                component="div"
                                                className="text-[#e74c3c] text-[12px] font-[700] leading-none tracking-tight pl-[15px] mt-[12px] block"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="mt-[30px] group w-[100%] inline-flex items-center justify-center px-[20px] py-[12px] text-[#FFF] hover:text-[#FFF] text-[14px] border-2 border-[#3D5A80] hover:border-[#98C1D9] bg-[#3D5A80] hover:bg-[#98C1D9] rounded-full uppercase font-bold"
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
                                                    </svg>{" "}
                                                    Loading....
                                                </>
                                            ) : (
                                                "Register"
                                            )}
                                        </span>
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                            <p className="mx-4 mb-0 text-center font-semibold">OR</p>
                        </div>
                        <p className="mb-0 text-center pt-1 text-sm font-semibold">
                            Already have an account?
                            <Link
                                href="/login"
                                className="hover:text-[#98C1D9] focus:text-[#98C1D9] ml-2"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
