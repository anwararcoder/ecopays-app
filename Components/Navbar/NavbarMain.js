"use client"
import {
    useQuery,
    QueryClient,
} from "@tanstack/react-query";
import { getAllCategories, getAllSubCategories } from "@/ReactQuery/FunctionsReactQuery";
import React, { useEffect, useRef, useState } from 'react'
import UserLogo from '../../public/images/man.png'
import ArDropdownList from '../Utilities/ArDropdownList';
import NavbarLinks from './NavbarLinks';
import { getSubCategories } from "@/Utilities/HelperFunctions";

const NavbarMain = () => {
    const [isStickyNavbar, setIsStickyNavbar] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [navActive, setNavActive] = useState(false);
    const dropdownRefLinksNavbar = useRef(null);
    const [queryClient] = useState(() => new QueryClient())
    const { data: categories, isLoading } = useQuery({
        queryKey: ["Categories"],
        queryFn: getAllCategories,
    });
    const { data: subCategories, isLoading: isLoadingSubCategories } = useQuery({
        queryKey: ["SubCategories"],
        queryFn: getAllSubCategories,
    });
    const options = categories?.data.map((category) => ({
        value: category._id,
        label: category.name,
        href: `/products?category[in][]=${category._id}`,
        haveSubOptions: getSubCategories(subCategories?.data, category._id)?.length > 0,
        subOptions: getSubCategories(subCategories?.data, category._id)?.map((subCategory) => ({
            value: subCategory._id,
            label: subCategory.name,
            href: `/products?subcategory[in][]=${subCategory._id}`,
        })) || []
    }));

    console.log("options", options);
    


    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 100 ? setIsStickyNavbar(true) : setIsStickyNavbar(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleOutsideClickLinks = (event) => {
            if (dropdownRefLinksNavbar.current && !dropdownRefLinksNavbar.current.contains(event.target)) {
                setNavActive(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClickLinks);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClickLinks);
        };
    }, []);

    return (
        <div className={`navbar-main bg-[#98C1D9] ${isStickyNavbar ? 'nav-fixed' : ''}`}>
            <div className='container mx-auto px-[15px]'>
                <div className='flex items-center justify-between'>
                    <div>
                        <ArDropdownList
                            className="min-w-[200px] text-[16px] leading-[1.1] font-[500] h-[60px] bg-[#EE6C4D] px-[15px] text-white"
                            // userImageLink={UserLogo}
                            svg={true}
                            options={options}
                            selectedOption={selectedOption}
                            onOptionSelect={(optionValue) => setSelectedOption(optionValue)}
                            placeholder="All Categories"
                        />
                    </div>
                    <NavbarLinks setNavActive={setNavActive} navActive={navActive} dropdownRef={dropdownRefLinksNavbar} categories={categories} isLoading={isLoading} />
                    <div className='lg:hidden'>
                        <svg onClick={() => setNavActive(!navActive)} className="w-[30px] h-[30px] cursor-pointer hover:fill-[#EE6C4D] fill-[#FFF]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M2 7h20a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zM22 11H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2zM22 17H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2z"></path></g></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarMain
