"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ContextAuth } from "@/Context/contextAuth";
import { verifyResetCode } from "@/ReactQuery/FunctionsReactQuery";
import toast from "react-hot-toast";
import logInBackground from "@/public/images/login/login-bg.jpg";
import VerificationCodeInput from 'react-verification-code-input';


const VerifyResetCode = () => {
    const router = useRouter();
    const { isLogged } = useContext(ContextAuth);
    const verifyResetCodeState = localStorage.getItem("VerifyResetCodeState");
    const useVerifyResetCodeMutation = () => {
        return useMutation({
            mutationFn: verifyResetCode,
            onSuccess: (response) => {
                toast.success("Reset Code Successfully");
                router.push("/resetPassword");
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message || error.message;
                toast.error(errorMessage);
            },
        });
    };

    const { mutateAsync } = useVerifyResetCodeMutation();

    useEffect(() => {
        if (isLogged) {
            router.push("/dashboard");
        }
        if (!verifyResetCodeState) {
            router.push("/");
        }
    }, [isLogged, verifyResetCodeState, router]);

    const [code, setCode] = useState('');

    const handleComplete = async (resetCode) => {
        setCode(resetCode);
        await mutateAsync({ resetCode })
    };


    return (
        <section className="p-[30px] min-h-[100vh] flex items-center justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                <div className="flex items-center">
                    <div className="w-[100%] h-[100%]">
                        <div
                            className="min-h-[600px] h-[100%] rounded-[10px] bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${logInBackground.src})` }}
                        ></div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="mx-auto w-[100%] sm:w-[75%] lg:w-[100%] p-[0px] sm:p-[70px] lg:p-[120px]">
                        <div className="mb-[30px] text-center">
                            <h1 className="text-[24px] md:text-[35px] lg:text-[30px] font-bold leading-[1.4] capitalize">
                                Verify your email address
                            </h1>
                            <p className="text-gray-500 text-base font-normal leading-[27px] mt-[18px]">
                                We emailed you a six-digit code. Enter the code below to confirm your email address.                            </p>
                        </div>
                        <VerificationCodeInput
                            onComplete={handleComplete}
                            length={6} // Adjust the length of the code as needed
                        />
                        <div className="mt-[30px] text-center bg-[#f9fafb] text-[#777] p-[15px] block text-[14px] font-[500]">
                            Make sure to keep this window open while check your inbox.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyResetCode;
