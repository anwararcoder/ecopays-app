"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const ArDropdownList = ({
  options,
  selectedOption,
  onOptionSelect,
  placeholder,
  userImageLink,
  className,
  svg,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubOptions, setOpenSubOptions] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenSubOptions(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setOpenSubOptions(null);
  };

  const handleOptionSelectLocal = (optionValue) => {
    onOptionSelect(optionValue);
    setIsOpen(false);
    setOpenSubOptions(null);
  };

  const toggleSubOptions = (optionValue) => {
    setOpenSubOptions(openSubOptions === optionValue ? null : optionValue);
    onOptionSelect(optionValue);
  };

  return (
    <div className="ar-dropdown flex relative" ref={dropdownRef}>
      <div
        className={`ar-dropdown-header w-full cursor-pointer inline-flex items-center gap-[12px] ${
          className ? className : "text-[14px] leading-[1.1] font-[500]"
        }`}
        onClick={toggleDropdown}
      >
        {userImageLink ? (
          <Image loading='lazy'
            src={userImageLink}
            alt="User"
            className="w-[40px] h-[40px] object-cover rounded-full"
          />
        ) : (
          ""
        )}

        {svg ? (
          <svg
            className="w-[30px] h-[30px] fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g>
              <g>
                <path d="M4.35 2C3.078 2 2 3.078 2 4.35v4.5c0 1.272 1.078 2.35 2.35 2.35h4.5c1.272 0 2.35-1.078 2.35-2.35v-4.5C11.2 3.078 10.122 2 8.85 2zM4 4.35c0-.168.182-.35.35-.35h4.5c.168 0 .35.182.35.35v4.5c0 .168-.182.35-.35.35h-4.5c-.168 0-.35-.182-.35-.35zM15.15 2c-1.272 0-2.35 1.078-2.35 2.35v4.5c0 1.272 1.078 2.35 2.35 2.35h4.5c1.272 0 2.35-1.078 2.35-2.35v-4.5C22 3.078 20.922 2 19.65 2zm-.35 2.35c0-.168.182-.35.35-.35h4.5c.168 0 .35.182.35.35v4.5c0 .168-.182.35-.35.35h-4.5c-.168 0-.35-.182-.35-.35zM2 15.15c0-1.272 1.078-2.35 2.35-2.35h4.5c1.272 0 2.35 1.078 2.35 2.35v4.5c0 1.272-1.078 2.35-2.35 2.35h-4.5C3.078 22 2 20.922 2 19.65zm2.35-.35c-.168 0-.35.182-.35.35v4.5c0 .168.182.35.35.35h4.5c.168 0 .35-.182.35-.35v-4.5c0-.168-.182-.35-.35-.35zM15.15 12.8c-1.272 0-2.35 1.078-2.35 2.35v4.5c0 1.272 1.078 2.35 2.35 2.35h4.5c1.272 0 2.35-1.078 2.35-2.35v-4.5c0-1.272-1.078-2.35-2.35-2.35zm-.35 2.35c0-.168.182-.35.35-.35h4.5c.168 0 .35.182.35.35v4.5c0 .168-.182.35-.35.35h-4.5c-.168 0-.35-.182-.35-.35z"></path>
              </g>
            </g>
          </svg>
        ) : (
          ""
        )}

        <div
          className={`flex items-center justify-between ${
            userImageLink ? "w-[calc(100%-40px)]" : "w-full"
          }`}
        >
          {selectedOption
            ? options.find((option) => option.value === selectedOption)?.label
            : placeholder
            ? placeholder
            : "Select..."}

          <i className="ml-[50px]">
            <svg
              className={`${isOpen ? " rotate-[180deg]" : ""} fill-white`}
              height="20"
              width="20"
              viewBox="0 0 20 20"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </i>
        </div>
      </div>
      {isOpen && (
        <ul className="ar-dropdown-options absolute z-[1080] rounded-[8px] top-[100%] left-0 bg-white w-full min-w-[190px] py-[30px] border-[1px] border-[#DDD]">
          {options?.map((option) => {
            const handleClick = () => {
              if (option.haveSubOptions) {
                toggleSubOptions(option.value);
              } 
              else {
                handleOptionSelectLocal(option.value);
                if (option.function) {
                  option.function();
                }
              }
            };

            return (
              <Fragment key={option.value}>
                <li
                  className={`ar-dropdown-option group relative cursor-pointer text-[14px] min-h-[40px] font-[500] flex items-center justify-between px-[30px] hover:text-white hover:bg-[#98C1D9] ${
                    selectedOption === option.value ? "bg-[#98C1D9]" : ""
                  }`}
                  onClick={handleClick}
                >
                  {option.href ? (
                    <Link href={option.href} className="inline-block leading-[40px] group-hover:text-white">
                      {option.label}
                    </Link>
                  ) : (
                    option.label
                  )}
                  {option.haveSubOptions && <span>〉</span>}
                  {option.haveSubOptions && (
                    <ul
                      className={`ar-dropdown-sub-options ml-[20px] border-l-[1px] border-[#DDD] pl-[10px] ${
                        openSubOptions === option.value ? "active" : ""
                      }`}
                    >
                      {option.subOptions.map((subOption) => (
                        <li
                          key={subOption.value}
                          className={`cursor-pointer text-[14px] leading-[3] font-[500] relative block px-[30px] hover:bg-[#98C1D9] hover:text-white ${
                            selectedOption === subOption.value
                              ? "bg-[#98C1D9]"
                              : ""
                          }`}
                          onClick={() =>
                            handleOptionSelectLocal(subOption.value)
                          }
                        >
                          {subOption.href ? (
                            <Link href={subOption.href} className="block hover:text-white">
                              {subOption.label}
                            </Link>
                          ) : (
                            subOption.label
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ArDropdownList;
