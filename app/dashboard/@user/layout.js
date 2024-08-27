"use client";
import Breadcrumb from "@/Components/Utilities/Breadcrumb";
import { ContextAuth } from "@/Context/contextAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useContext } from "react";

export default function Layout({ children }) {
  let { logout } = useContext(ContextAuth);
  const pathname = usePathname();
  const pathOfArray = pathname?.split("/").filter((crumb) => crumb);
  const pageTitleName = pathOfArray[pathOfArray.length - 1];
  const listLinksPages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      svg: `<svg className="h-[24px] w-[24px] font-bold fill-[#3D5A80]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" > <g> <g fill="#000"> <path d="M9.5 17.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"></path> <path d="M14.169 2.575a3.5 3.5 0 0 0-4.338 0l-6.5 5.132A3.5 3.5 0 0 0 2 10.454V18.5A3.5 3.5 0 0 0 5.5 22h13a3.5 3.5 0 0 0 3.5-3.5v-8.046a3.5 3.5 0 0 0-1.331-2.747zm-3.718.785a2.5 2.5 0 0 1 3.098 0l6.5 5.132A2.5 2.5 0 0 1 21 10.454V18.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-8.046a2.5 2.5 0 0 1 .95-1.962z"></path> </g> </g> </svg>`,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      svg: `<svg className="h-[24px] w-[24px] font-bold fill-[#3D5A80]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" > <g> <path d="M20.826 2c-3.575 0-6.484 2.914-6.484 6.492v1.746H12.6c-1.753 0-2.558 1.223-2.817 2.68L6.13 36.717c-.34 1.936 1.213 2.982 2.817 2.982h9.324a1 1 0 1 0 0-2H8.946c-.588 0-.9-.337-.84-.678l3.656-23.8c.103-.631.471-.983.838-.983h1.742v4.492a1 1 0 1 0 2 0v-4.492h8.967v4.492a1 1 0 1 0 2 0v-4.492h1.742c.628.009.754.494.84.983l1.369 8.918a1 1 0 0 0 1.977-.305l-1.37-8.916c-.322-1.668-1.347-2.68-2.816-2.68h-1.742V8.492C27.309 4.914 24.402 2 20.826 2zm0 2c2.5 0 4.483 1.985 4.483 4.492v1.746h-8.967V8.492A4.457 4.457 0 0 1 20.826 4z"></path> <path d="M31.463 25.1c-5.762 0-10.455 4.691-10.455 10.45 0 5.76 4.693 10.45 10.455 10.45 5.762 0 10.455-4.69 10.455-10.45S37.225 25.1 31.463 25.1zm0 2c4.682 0 8.455 3.772 8.455 8.45S36.145 44 31.463 44a8.437 8.437 0 0 1-8.455-8.45 8.438 8.438 0 0 1 8.455-8.45z"></path> <path d="m34.674 31.932-4.293 5.109-2.182-2.217a1 1 0 0 0-1.425 1.403l2.953 3a1 1 0 0 0 1.478-.059l5-5.95a1 1 0 0 0-.123-1.41c-.487-.384-1.011-.315-1.408.124z"></path> </g> </svg>`,
    },
    {
      title: "Address",
      href: "/dashboard/address",
      svg: `<svg className="h-[24px] w-[24px] font-bold fill-[#3D5A80]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.16 368.16" > <g> <path d="M184.08 0c-74.992 0-136 61.008-136 136 0 24.688 11.072 51.24 11.536 52.36 3.576 8.488 10.632 21.672 15.72 29.4l93.248 141.288c3.816 5.792 9.464 9.112 15.496 9.112s11.68-3.32 15.496-9.104l93.256-141.296c5.096-7.728 12.144-20.912 15.72-29.4.464-1.112 11.528-27.664 11.528-52.36 0-74.992-61.008-136-136-136zM293.8 182.152c-3.192 7.608-9.76 19.872-14.328 26.8l-93.256 141.296c-1.84 2.792-2.424 2.792-4.264 0L88.696 208.952c-4.568-6.928-11.136-19.2-14.328-26.808-.136-.328-10.288-24.768-10.288-46.144 0-66.168 53.832-120 120-120s120 53.832 120 120c0 21.408-10.176 45.912-10.28 46.152z"></path> <path d="M184.08 64.008c-39.704 0-72 32.304-72 72s32.296 72 72 72 72-32.304 72-72-32.296-72-72-72zm0 128c-30.872 0-56-25.12-56-56s25.128-56 56-56 56 25.12 56 56-25.128 56-56 56z"></path> </g> </svg>`,
    },
    {
      title: "Change Password",
      href: "/dashboard/changePassword",
      svg: `<svg className="h-[24px] w-[24px] font-bold fill-[#3D5A80]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" > <g> <path d="M469.333 149.333H42.667C19.135 149.333 0 168.469 0 192v128c0 23.531 19.135 42.667 42.667 42.667h426.667C492.865 362.667 512 343.531 512 320V192c0-23.531-19.135-42.667-42.667-42.667zM490.667 320c0 11.76-9.573 21.333-21.333 21.333H42.667c-11.76 0-21.333-9.573-21.333-21.333V192c0-11.76 9.573-21.333 21.333-21.333h426.667c11.76 0 21.333 9.573 21.333 21.333v128z"></path> <path d="M132.948 234.667c-2.958-5.125-9.51-6.844-14.573-3.906l-11.708 6.76V224c0-5.896-4.771-10.667-10.667-10.667S85.333 218.104 85.333 224v13.521l-11.708-6.76c-5.094-2.938-11.625-1.219-14.573 3.906-2.948 5.104-1.198 11.625 3.906 14.573L74.665 256l-11.707 6.76c-5.104 2.948-6.854 9.469-3.906 14.573a10.657 10.657 0 0 0 9.25 5.333c1.813 0 3.646-.458 5.323-1.427l11.708-6.76V288c0 5.896 4.771 10.667 10.667 10.667s10.667-4.771 10.667-10.667v-13.521l11.708 6.76a10.604 10.604 0 0 0 5.323 1.427c3.688 0 7.271-1.906 9.25-5.333 2.948-5.104 1.198-11.625-3.906-14.573L117.335 256l11.707-6.76c5.104-2.948 6.854-9.469 3.906-14.573zM239.615 234.667c-2.969-5.125-9.5-6.844-14.573-3.906l-11.708 6.76V224a10.66 10.66 0 0 0-10.667-10.667A10.66 10.66 0 0 0 192 224v13.521l-11.708-6.76c-5.104-2.938-11.635-1.219-14.573 3.906-2.948 5.104-1.198 11.625 3.906 14.573l11.707 6.76-11.707 6.76c-5.104 2.948-6.854 9.469-3.906 14.573a10.657 10.657 0 0 0 9.25 5.333c1.813 0 3.646-.458 5.323-1.427l11.708-6.76V288a10.66 10.66 0 0 0 10.667 10.667A10.66 10.66 0 0 0 213.334 288v-13.521l11.708 6.76a10.604 10.604 0 0 0 5.323 1.427c3.688 0 7.271-1.906 9.25-5.333 2.948-5.104 1.198-11.625-3.906-14.573L224.001 256l11.707-6.76c5.105-2.948 6.855-9.469 3.907-14.573zM346.281 234.667c-2.958-5.125-9.51-6.844-14.573-3.906L320 237.521V224a10.66 10.66 0 0 0-10.667-10.667A10.66 10.66 0 0 0 298.666 224v13.521l-11.708-6.76c-5.094-2.938-11.625-1.219-14.573 3.906-2.948 5.104-1.198 11.625 3.906 14.573l11.707 6.76-11.707 6.76c-5.104 2.948-6.854 9.469-3.906 14.573a10.657 10.657 0 0 0 9.25 5.333c1.813 0 3.646-.458 5.323-1.427l11.708-6.76V288a10.66 10.66 0 0 0 10.667 10.667A10.66 10.66 0 0 0 320 288v-13.521l11.708 6.76a10.604 10.604 0 0 0 5.323 1.427c3.688 0 7.271-1.906 9.25-5.333 2.948-5.104 1.198-11.625-3.906-14.573L330.668 256l11.707-6.76c5.104-2.948 6.854-9.469 3.906-14.573zM452.948 234.667c-2.948-5.125-9.5-6.844-14.573-3.906l-11.708 6.76V224A10.66 10.66 0 0 0 416 213.333 10.66 10.66 0 0 0 405.333 224v13.521l-11.708-6.76c-5.115-2.938-11.615-1.219-14.573 3.906-2.948 5.104-1.198 11.625 3.906 14.573l11.707 6.76-11.707 6.76c-5.104 2.948-6.854 9.469-3.906 14.573a10.657 10.657 0 0 0 9.25 5.333c1.813 0 3.646-.458 5.323-1.427l11.708-6.76V288A10.66 10.66 0 0 0 416 298.667 10.66 10.66 0 0 0 426.667 288v-13.521l11.708 6.76a10.604 10.604 0 0 0 5.323 1.427c3.688 0 7.271-1.906 9.25-5.333 2.948-5.104 1.198-11.625-3.906-14.573L437.335 256l11.707-6.76c5.104-2.948 6.854-9.469 3.906-14.573z"></path> </g> </svg>`,
    },
  ];

  return (
    <>
      <Breadcrumb pageTitle={pageTitleName} />

      <section className="pb-[100px]">
        <div className="container px-[15px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-[30px]">
            <div className="col-span-1 md:col-span-2">
              <ul className="flex flex-col gap-[15px]">
                {listLinksPages.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={`border-[#DDD] border-[2px] rounded-[8px] py-[15px] px-[25px] flex items-center flex-wrap gap-[15px] cursor-pointer text-[16px] font-[500] capitalize leading-[1] ${
                          pathname === item.href
                            ? "dashboardUserLinkActive"
                            : ""
                        }`}
                      >
                        <span
                          className={`h-[24px] w-[24px] ${
                            pathname === item.href ? "text-[#FFF]" : ""
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.svg }}
                        />
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={logout}
                    className="border-[#DDD] border-[2px] border-solid w-full rounded-[8px] py-[15px] px-[25px] flex items-center flex-wrap gap-[15px] cursor-pointer text-[16px] font-[500] capitalize leading-[1]"
                  >
                    <svg
                      className="h-[24px] w-[24px] font-bold fill-[#3D5A80]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 471.2 471.2"
                    >
                      <g>
                        <path d="M227.619 444.2h-122.9c-33.4 0-60.5-27.2-60.5-60.5V87.5c0-33.4 27.2-60.5 60.5-60.5h124.9c7.5 0 13.5-6 13.5-13.5s-6-13.5-13.5-13.5h-124.9c-48.3 0-87.5 39.3-87.5 87.5v296.2c0 48.3 39.3 87.5 87.5 87.5h122.9c7.5 0 13.5-6 13.5-13.5s-6.1-13.5-13.5-13.5z"></path>
                        <path d="m450.019 226.1-85.8-85.8c-5.3-5.3-13.8-5.3-19.1 0-5.3 5.3-5.3 13.8 0 19.1l62.8 62.8h-273.9c-7.5 0-13.5 6-13.5 13.5s6 13.5 13.5 13.5h273.9l-62.8 62.8c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4l85.8-85.8c5.4-5.4 5.4-14 .1-19.2z"></path>
                      </g>
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-span-1 md:col-span-5">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
