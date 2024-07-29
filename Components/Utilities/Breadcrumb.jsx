"use client";
import React, { Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Breadcrumb = ({ pageTitle }) => {
  const pathname = usePathname();
  const crumbs = pathname?.split("/").filter((crumb) => crumb);
  crumbs.pop();

  return (
    <nav className="py-[30px]">
      <div className="container mx-auto px-[15px]">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-[#3D5A80] hover:text-[#98C1D9] capitalize"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          {crumbs?.map((crumb, index) => {
            const linkPath = crumbs.slice(0, index + 1).join("/");
            const isLast = index === crumbs.length - 1;
            return (
              <li key={index}>
                {linkPath !== "/" && (
                  <>
                    <div className="flex items-center">
                      <svg
                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <Link
                        href={`/${linkPath}`}
                        className="ms-1 text-sm font-medium text-[#3D5A80] hover:text-[#98C1D9] md:ms-2 capitalize"
                      >
                        {crumb}
                      </Link>
                    </div>
                  </>
                )}
              </li>
            );
          })}
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 capitalize">
                {pageTitle}
              </span>
            </div>
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
