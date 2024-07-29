import React, { useState } from 'react'

const AccordionItem = ({ title, children, className, open }) => {
    const [isOpen, setIsOpen] = useState(open ? open : false);

    return (
        <div className={className ? className : ''}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center justify-between w-full flex-wrap gap-[10px]'
            >
                <h4 className='text-[24px] leading-[1.3] capitalize font-[600]'>{title}</h4>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className='mt-[20px]'>
                    {children}
                </div>
            )}
        </div>
    );
};

export default AccordionItem
