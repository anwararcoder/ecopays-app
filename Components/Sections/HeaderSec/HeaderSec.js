import Image from 'next/image'
import React from 'react'
import HeaderImage from '../../../public/images/header/header.png'
import Link from 'next/link'

const Header = () => {
    return (
        <section className='py-[120px] bg-[#3D5A80]'>
            <div className='container px-[15px] mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className="flex items-center">
                        <div className='w-full'>
                        <span className="block text-[16px] font-medium capitalize text-white">In this season, find the best 🔥</span>
                        <h2 className="font-semibold text-white text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl !leading-[114%]">
                            Exclusive collection <br /> for everyone
                        </h2>
                        <Link className="btn-1 btn-2 mt-[30px]" href="/products"><span>Explore now</span></Link>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-full'>
                            <Image loading='lazy' src={HeaderImage} alt="header" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header
