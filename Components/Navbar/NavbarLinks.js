import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const NavbarLinks = ({ setNavActive, navActive, dropdownRef, categories, isLoading }) => {


    if (isLoading) {
        return(
            <ul className={`list-nav-box hidden lg:flex flex-wrap items-center gap-[30px] ${navActive ? "active" : ""}`} ref={dropdownRef}>
                <Skeleton height={20} width={75} />
                <Skeleton height={20} width={75} />
                <Skeleton height={20} width={75} />
                <Skeleton height={20} width={75} />
                <Skeleton height={20} width={75} />
                <Skeleton height={20} width={75} />
            </ul>
        )
    }
    return (
        <ul className={`list-nav-box hidden lg:flex flex-wrap items-center gap-[30px] ${navActive ? "active" : ""}`} ref={dropdownRef}>
            <li className='close lg:hidden' onClick={()=>setNavActive(false)}>X</li>
            {categories?.data.map(item => {
                return (
                    <li key={item._id} className='leading-[1]'>
                        <Link className="text-[#FFF] hover:text-[#EE6C4D] text-[16px] leading-[1.1] font-[500]" href={`products?category[in][]=${item._id}`}>
                            {item.name}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default NavbarLinks
