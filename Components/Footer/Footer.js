import React from 'react'
import LogoImage from '../../public/images/logo/2logo.png'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="py-[60px] bg-[#EE6C4D] relative">
            <div className="container px-[15px] mx-auto relative z-10">
                <div className="gap-[50px] mb-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Image loading='lazy' loading="lazy" className="mb-[30px] w-[125px]" src={LogoImage} alt="01 Logo" />
                        <p className="leading-[19px] text-white">SIn This Season, Find The Best 🔥 Exclusive collection for everyone</p>
                    </div>
                    <div>
                        <ul className="flex flex-col gap-[20px]">
                            <li>
                                <Link className="block transition-all duration-200 text-white hover:text-[#3D5A80] hover:pl-[5px] leading-[1.2] font-[500]" href="/dashboard">Mu Account</Link>
                            </li>
                            <li>
                                <Link className="block transition-all duration-200 text-white hover:text-[#3D5A80] hover:pl-[5px] leading-[1.2] font-[500]" href="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex flex-col gap-[20px]">
                            <li>
                                <Link className="block transition-all duration-200 text-white hover:text-[#3D5A80] hover:pl-[5px] leading-[1.2] font-[500]" href="/cart">Cart</Link>
                            </li>
                            <li>
                                <Link className="block transition-all duration-200 text-white hover:text-[#3D5A80] hover:pl-[5px] leading-[1.2] font-[500]" href="/wishlist">Wishlist</Link>
                            </li>
                            <li>
                                <Link className="block transition-all duration-200 text-white hover:text-[#3D5A80] hover:pl-[5px] leading-[1.2] font-[500]" href="/products">Shop</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex flex-col gap-[20px]">
                            <li>
                                <Link className="block transition-all duration-200 text-white hover:text-[#3D5A80] hover:pl-[5px] leading-[1.2] font-[500]" href="/about">About Us</Link>
                            </li>
                            <li>
                                <Link className="block transition-all duration-200 text-white hover:text-[#3D5A80] hover:pl-[5px] leading-[1.2] font-[500]" href="/faqs">FAQs</Link>
                            </li>
                            <li>
                                <Link className="block transition-all duration-200 text-white hover:text-[#3D5A80] hover:pl-[5px] leading-[1.2] font-[500]" href="/contact">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                    <div>
                        <ul className="flex items-center gap-[8px] flex-wrap">
                            <li className="inline-flex mx-[5px]">
                                <a href="#" aria-label="facebook" className="group flex items-center justify-center text-center bg-[#FFF] hover:bg-[#98C1D9] w-[45px] h-[45px] rounded-full">
                                    <svg className="fill-[#000] group-hover:fill-white" width="10" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 18">
                                        <path d="M6.464 18V9.79h2.894l.434-3.2H6.464V4.546c0-.927.27-1.558 1.665-1.558l1.78-.001V.126A25.003 25.003 0 0 0 7.316 0C4.75 0 2.993 1.491 2.993 4.23v2.36H.09v3.2h2.902V18h3.47z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                            <li className="inline-flex mx-[5px]">
                                <a href="#" aria-label="x" className="group flex items-center justify-center text-center bg-[#FFF] hover:bg-[#98C1D9] w-[45px] h-[45px] rounded-full">
                                    <svg className="fill-[#000] group-hover:fill-white" viewBox="0 0 24 24" width="18" height="18">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                            <li className="inline-flex mx-[5px]">
                                <a href="#" aria-label="youtube" className="group flex items-center justify-center text-center bg-[#FFF] hover:bg-[#98C1D9] w-[45px] h-[45px] rounded-full">
                                    <svg className="fill-[#000] group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 14">
                                        <path d="m10.439 13.98-4.063-.076c-1.315-.027-2.633.026-3.923-.248-1.961-.41-2.1-2.417-2.246-4.101-.2-2.368-.123-4.779.256-7.127C.676 1.11 1.516.324 2.815.238c4.386-.31 8.8-.273 13.176-.128.462.013.927.086 1.383.168 2.25.403 2.304 2.679 2.45 4.594.145 1.935.084 3.88-.194 5.803-.223 1.59-.65 2.925-2.45 3.054-2.256.169-4.46.304-6.722.261 0-.01-.013-.01-.02-.01zM8.05 9.95l5.058-2.969c-1.703-.997-3.367-1.978-5.058-2.969v5.938z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                            <li className="inline-flex mx-[5px]">
                                <a href="#" aria-label="linkedin" className="group flex items-center justify-center text-center bg-[#FFF] hover:bg-[#98C1D9] w-[45px] h-[45px] rounded-full">
                                    <svg className="fill-[#000] group-hover:fill-white" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.3895 9.31525C13.3034 9.27387 13.2159 9.23405 13.1272 9.19592C12.9729 6.34569 11.4186 4.71393 8.80878 4.69723C8.79695 4.69716 8.78519 4.69716 8.77337 4.69716C7.21237 4.69716 5.91411 5.36482 5.11504 6.57976L6.55035 7.56635C7.14729 6.65884 8.08412 6.46537 8.77406 6.46537C8.78203 6.46537 8.79003 6.46537 8.79791 6.46544C9.65723 6.47093 10.3057 6.72128 10.7254 7.2095C11.0308 7.56494 11.235 8.05611 11.3362 8.67599C10.5743 8.54623 9.75035 8.50634 8.86952 8.55694C6.38824 8.70016 4.79307 10.1502 4.9002 12.1651C4.95457 13.1872 5.46271 14.0665 6.33098 14.6409C7.06508 15.1264 8.01056 15.3639 8.99319 15.3101C10.2909 15.2389 11.3089 14.7427 12.0191 13.8356C12.5585 13.1467 12.8996 12.254 13.0502 11.1291C13.6687 11.5031 14.127 11.9952 14.3801 12.5868C14.8106 13.5925 14.8357 15.2451 13.4899 16.5924C12.3109 17.7727 10.8936 18.2833 8.75165 18.2991C6.37568 18.2815 4.57877 17.5179 3.41046 16.0297C2.31644 14.6362 1.75105 12.6234 1.72995 10.0471C1.75105 7.47084 2.31644 5.458 3.41046 4.06447C4.57877 2.57627 6.37565 1.81276 8.75162 1.79507C11.1448 1.81289 12.9731 2.58008 14.1861 4.07546C14.7809 4.80877 15.2293 5.73097 15.5249 6.80622L17.2069 6.35655C16.8486 5.03304 16.2847 3.89256 15.5174 2.94672C13.9623 1.02958 11.688 0.0472246 8.75749 0.0268555H8.74576C5.82125 0.0471538 3.57234 1.03324 2.06153 2.95771C0.717109 4.67024 0.0236191 7.05311 0.000317057 10.0401L0.000244141 10.0471L0.000317057 10.0542C0.0236191 13.0411 0.717109 15.424 2.06153 17.1365C3.57234 19.061 5.82125 20.0471 8.74576 20.0674H8.75749C11.3575 20.0493 13.1902 19.3672 14.7 17.8557C16.6754 15.8783 16.6159 13.3996 15.9648 11.878C15.4977 10.7868 14.6072 9.90059 13.3895 9.31525ZM8.9003 13.5445C7.8128 13.6059 6.683 13.1168 6.62729 12.0691C6.586 11.2923 7.17898 10.4256 8.96704 10.3223C9.17181 10.3105 9.37275 10.3047 9.57014 10.3047C10.2196 10.3047 10.8272 10.3679 11.3796 10.4889C11.1736 13.0673 9.96504 13.4859 8.9003 13.5445Z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center col-span-1 text-center md:col-span-2 lg:col-span-1">
                        <div className='font-[600] capitalize text-[18px] text-white' style={{fontFamily: "Saira"}}>@ 2024 ECOPAYS All rights reserved.</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
