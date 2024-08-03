"use client"
import React, { useContext, useState } from 'react'
import LogoImage from '../../public/images/logo/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import SearchBox from '../Utilities/SearchBox'
import ArDropdownList from '../Utilities/ArDropdownList'
import UserLogo from '../../public/images/man.png'
import { ContextAuth } from '@/Context/contextAuth'
import { getCart, getWishlist } from '@/ReactQuery/FunctionsReactQuery'
import { useQuery } from '@tanstack/react-query'


const NavbarTop = () => {
    const { dataUser, isLogged, logout } = useContext(ContextAuth);
    const [selectedOption, setSelectedOption] = useState('');

    const { data: cart, refetch: refetchCart } = useQuery({
        queryKey: ["Cart"],
        queryFn: getCart,
        enabled: isLogged, 
    });

    const { data: wishlist, refetch: refetchWishlist } = useQuery({
        queryKey: ["Wishlist"],
        queryFn: getWishlist,
        enabled: isLogged, 
    });

    const optionsUser = [
        {
            value: "Dashboard",
            label: "Dashboard",
            href: `/dashboard`
        },
        {
            value: "Logout",
            label: "Logout",
            function: () => {
                logout()
            }
        }
    ]

    return (
        <div className='navbar-top py-[20px]'>
            <div className='container px-[15px] mx-auto '>
                <div className='flex items-center justify-center xl:justify-between flex-wrap gap-[30px]'>
                    <Link href='/' className='block'>
                        <Image className='w-[180px]' src={LogoImage} alt='Logo' />
                    </Link>
                    <SearchBox />
                    <div>
                        <ul className='flex items-center gap-[15px]'>
                            <li>
                                <Link href='/wishlist' className='group flex flex-wrap items-center gap-[8px] bg-[#F5F5F5] px-[15px] min-h-[50px] rounded-[3px] font-[500] hover:bg-[#3D5A80] hover:text-white'>
                                    {wishlist?.data.length && <span className='hidden sm:inline-block'>{wishlist?.data.length}</span>}
                                    <div className='block relative'>
                                        <svg className='w-[20px] h-[20px] group-hover:fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><switch><g><path d="M512 171c-1-40.1-16.6-78-43.9-106.7-27.6-29-64.3-45.7-103.3-46.9C323.9 16 285 31.6 256 59.9c-28.1-27.3-65.4-42.8-104.6-42.7-39.5.2-76.8 16.1-105.3 44.9C16.5 92.1-.3 133.7 0 176.3c.3 41.5 16 80.5 44.3 110L238 487.1c4.9 5.1 11.4 7.6 18 7.6 6.2 0 12.5-2.3 17.4-7 9.9-9.6 10.2-25.4.6-35.4L80.3 251.7C61 231.5 50.2 204.6 50 175.9c-.2-29.4 11.3-58 31.6-78.6 19-19.3 43.9-30 70-30.1h.4c33 0 64.1 17 83.2 45.4 4.6 6.9 12.4 11 20.7 11s16.1-4.1 20.7-11c19.9-29.5 52.2-46.5 86.4-45.4 25.8.8 50.2 12 68.7 31.4 18.8 19.7 29.5 45.8 30.1 73.4.7 29.5-9.7 57.3-29.2 78.4 0 .1-.1.1-.1.2l-126 130.9c-9.6 9.9-9.3 25.8.7 35.3 9.9 9.6 25.8 9.3 35.3-.7l126.4-131.4.8-.8C498 253.5 513 213.4 512 171z"></path></g></switch></g></svg>
                                        {wishlist?.data.length > 0 && <span className='absolute top-[-4px] right-[-8px] flex sm:hidden items-center justify-center leading-[1] bg-[#98C1D9] w-[18px] h-[18px] rounded-full text-[#FFF] font-bold text-[11px]'>{wishlist?.data.length}</span>}
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href='/cart' className='group flex flex-wrap items-center gap-[8px] bg-[#F5F5F5] px-[15px] min-h-[50px] rounded-[3px] font-[500] hover:bg-[#3D5A80] hover:text-white'>
                                <span className='hidden sm:inline-block'>{cart?.data.totalCartPrice} EG</span>
                                    <div className='block relative'>
                                        <svg className='w-[20px] h-[20px] group-hover:fill-white' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512"><g><path d="M136.587 322.105h291.968a41.744 41.744 0 0 0 40.656-31.936l42.498-174.366a12 12 0 0 0-11.659-14.842H108.852L91.961 30.03a12 12 0 0 0-11.674-9.22H30.051c-6.627 0-12 5.373-12 12s5.373 12 12 12H70.81l13.371 56.152H11.949c-6.628 0-12 5.373-12 12s5.372 12 12 12h472.825l-38.881 159.523c-1.986 8.146-8.954 13.62-17.339 13.62H136.587c-25.56 0-46.354 20.794-46.354 46.354 0 25.561 20.794 46.355 46.354 46.355h4.341c-18.755 7.936-31.948 26.524-31.948 48.136 0 28.805 23.435 52.239 52.239 52.239s52.238-23.434 52.238-52.239c0-21.612-13.192-40.2-31.947-48.136h230.026c-18.755 7.936-31.948 26.524-31.948 48.136 0 28.805 23.435 52.239 52.239 52.239s52.239-23.434 52.239-52.239c0-21.612-13.193-40.2-31.948-48.136h17.154c6.628 0 12-5.373 12-12s-5.372-12-12-12H136.587c-12.326 0-22.354-10.028-22.354-22.355 0-12.325 10.028-22.354 22.354-22.354zM161.22 467.19c-15.571 0-28.239-12.668-28.239-28.239s12.668-28.239 28.239-28.239c15.57 0 28.238 12.668 28.238 28.239S176.79 467.19 161.22 467.19zm270.608 0c-15.571 0-28.239-12.668-28.239-28.239s12.668-28.239 28.239-28.239 28.239 12.668 28.239 28.239-12.668 28.239-28.239 28.239zM85.36 190.676c-6.627 0-12-5.373-12-12s5.373-12 12-12h146.572c6.627 0 12 5.373 12 12s-5.373 12-12 12zm80.109 65.715H20.168c-6.627 0-12-5.373-12-12s5.373-12 12-12h145.301c6.627 0 12 5.373 12 12s-5.373 12-12 12z"></path></g></svg>
                                        <span className='absolute top-[-4px] right-[-8px] flex items-center justify-center leading-[1] bg-[#98C1D9] w-[18px] h-[18px] rounded-full text-[#FFF] font-bold text-[11px]'>{cart?.numOfCartItems}</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                {isLogged ? <ArDropdownList
                                    className="min-w-[200px] text-[16px] leading-[1.1] font-[500] h-[50px] capitalize"
                                    userImageLink={UserLogo}
                                    svg={false}
                                    options={optionsUser}
                                    selectedOption={selectedOption}
                                    onOptionSelect={(item) => setSelectedOption(item)}
                                    placeholder={dataUser?.data?.name}
                                /> : <Link className="btn-1 btn-3 small" href="/login"><span>Sign up / Sign in</span></Link>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarTop
