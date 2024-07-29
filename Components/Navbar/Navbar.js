import React from 'react'
import TopNavbar from '../TopNavbar/TopNavbar'
import NavbarTop from './NavbarTop'
import NavbarMain from './NavbarMain'

const Navbar = () => {
    return (
        <div className='all-navbar relative'>
            <TopNavbar />
            <div className='navbar relative'>
                <NavbarTop />
                <NavbarMain />
            </div>
        </div>
    )
}

export default Navbar
