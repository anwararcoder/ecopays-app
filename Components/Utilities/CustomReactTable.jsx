// import React, { useState } from "react";
// import {
//   useTable,
//   useSortBy,
//   usePagination,
//   useGlobalFilter,
// } from "react-table";
// import UpAndDown from "./UpAndDown";
// import Link from "next/link";

// const CustomReactTable = ({ columns, data, addNewPage }) => {
//   const [filterInput, setFilterInput] = useState("");

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     visibleColumns,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize, globalFilter },
//     setGlobalFilter,
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0, pageSize: 10 },
//     },
//     useGlobalFilter,
//     useSortBy,
//     usePagination
//   );

//   const generateSortingIndicator = (column) => {
//     return column.isSorted ? (
//       column.isSortedDesc ? (
//         <UpAndDown />
//       ) : (
//         <UpAndDown />
//       )
//     ) : (
//       ""
//     );
//   };

//   const onChangeInSelect = (event) => {
//     setPageSize(Number(event.target.value));
//   };

//   const onChangeInInput = (event) => {
//     const page = event.target.value ? Number(event.target.value) - 1 : 0;
//     gotoPage(page);
//   };

//   const handleFilterChange = (e) => {
//     const value = e.target.value || "";
//     setGlobalFilter(value); // Use setGlobalFilter to update the global filter value
//     setFilterInput(value);
//   };

//   return (
//     <>
//       <div className="flex flex-row items-center justify-between gap-[30px] mb-[30px]">
//         <Link href={addNewPage.link} className="min-w-min-[150px] inline-flex items-center justify-center px-[20px] py-[12px] text-[#FFF] hover:text-[#FFF] text-[14px] border-2 border-[#3498db] hover:border-[#2980b9] bg-[#3498db] hover:bg-[#2980b9] rounded-[50px] capitalize font-bold">{addNewPage.title}</Link>
//         {!(data.length == 0) && (
//           <div className="relative">
//             <input
//               className="h-[50px] w-[100%] leading-[50px] border-[2px] border-[#DDD] focus:border-[#3498db] text-[#3D5A80] text-[14px] rounded-[40px] bg-[#FFF] px-[15px]"
//               value={filterInput}
//               onChange={handleFilterChange}
//               placeholder="Search table..."
//             />
//             <button
//               type="submit"
//               className="group absolute top-[50%] translate-y-[-50%] right-[15px]"
//             >
//               <svg
//                 className="fill-[#3D5A80] group-hover:fill-[#3498db]"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 1024 1024"
//               >
//                 <path d="M992.262 871.396l-242.552-206.294c-25.074-22.566-51.89-32.926-73.552-31.926 57.256-67.068 91.842-154.078 91.842-249.176 0-212.078-171.922-384-384-384-212.076 0-384 171.922-384 384s171.922 384 384 384c95.098 0 182.108-34.586 249.176-91.844-1 21.662 9.36 48.478 31.926 73.552l206.294 242.552c35.322 39.246 93.022 42.554 128.22 7.356s31.892-92.898-7.354-128.22zM384 640c-141.384 0-256-114.616-256-256s114.616-256 256-256 256 114.616 256 256-114.614 256-256 256z"></path>
//               </svg>
//             </button>
//           </div>
//         )}
//       </div>
//       {data.length == 0 ? (
//         <div className="text-center text-[18px] font-bold capitalize">
//           There are no items
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table {...getTableProps()} className="min-w-full">
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers.map((column) => (
//                     <th
//                       className={`px-6 py-4 ${
//                         column.render("Header") === "Actions"
//                           ? "text-center"
//                           : "text-left"
//                       }`}
//                       {...column.getHeaderProps(column.getSortByToggleProps())}
//                     >
//                       {column.render("Header")}
//                       {generateSortingIndicator(column)}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody
//               {...getTableBodyProps()}
//               className="bg-white divide-y divide-gray-200"
//             >
//               {page.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr {...row.getRowProps()}>
//                     {row.cells.map((cell) => {
//                       return (
//                         <td
//                           {...cell.getCellProps()}
//                           className="px-6 py-4 whitespace-no-wrap text-[16px] leading-[1.3] font-[500]"
//                         >
//                           {cell.render("Cell")}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {pageOptions.length > 1 && (
//             <>
//               <div className="flex flex-wrap items-center justify-between gap-[30px] mt-[30px]">
//                 <div className="flex flex-wrap items-center gap-[10px]">
//                   <button
//                     className="inline-flex justify-center items-center w-[40px] h-[40px] text-[14px] font-bold hover:bg-[#FFF] border-[1px] border-[#DDD] disabled:cursor-not-allowed"
//                     onClick={() => gotoPage(0)}
//                     disabled={!canPreviousPage}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       data-lucide="chevrons-left"
//                       className="w-4 h-4"
//                     >
//                       <path d="m11 17-5-5 5-5"></path>
//                       <path d="m18 17-5-5 5-5"></path>
//                     </svg>
//                   </button>
//                   <button
//                     className="inline-flex justify-center items-center w-[40px] h-[40px] text-[14px] font-bold hover:bg-[#FFF] border-[1px] border-[#DDD] disabled:cursor-not-allowed"
//                     onClick={previousPage}
//                     disabled={!canPreviousPage}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       data-lucide="chevron-left"
//                       className="w-4 h-4"
//                     >
//                       <path d="m15 18-6-6 6-6"></path>
//                     </svg>
//                   </button>
//                   <div>
//                     Page
//                     <strong className="ml-[5px]">
//                       {pageIndex + 1} of {pageOptions.length}
//                     </strong>
//                   </div>
//                   <div>
//                     <input
//                       type="number"
//                       className="bg-[#FFF] border-[1px] border-[#DDD] h-[40px] leading-[40px] pl-[15px] w-[70px]"
//                       min={1}
//                       max={pageOptions.length}
//                       defaultValue={pageIndex + 1}
//                       onChange={onChangeInInput}
//                     />
//                   </div>
//                   <button
//                     className="inline-flex justify-center items-center w-[40px] h-[40px] text-[14px] font-bold hover:bg-[#FFF] border-[1px] border-[#DDD] disabled:cursor-not-allowed"
//                     onClick={nextPage}
//                     disabled={!canNextPage}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       data-lucide="chevron-right"
//                       className="w-4 h-4"
//                     >
//                       <path d="m9 18 6-6-6-6"></path>
//                     </svg>
//                   </button>
//                   <button
//                     className="inline-flex justify-center items-center w-[40px] h-[40px] text-[14px] font-bold hover:bg-[#FFF] border-[1px] border-[#DDD] disabled:cursor-not-allowed"
//                     onClick={() => gotoPage(pageCount - 1)}
//                     disabled={!canNextPage}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       data-lucide="chevrons-right"
//                       className="w-4 h-4"
//                     >
//                       <path d="m6 17 5-5-5-5"></path>
//                       <path d="m13 17 5-5-5-5"></path>
//                     </svg>
//                   </button>
//                 </div>
//                 <div>
//                   <select
//                     className="bg-[#FFF] border-[1px] border-[#DDD] h-[40px] leading-[40px] px-[15px]"
//                     value={pageSize}
//                     onChange={onChangeInSelect}
//                   >
//                     {[10, 20, 30, 40, 50].map((pageSize) => (
//                       <option key={pageSize} value={pageSize}>
//                         Show {pageSize}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomReactTable;
