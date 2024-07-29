"use client";
import formatDateTime from "@/Components/Utilities/formatDateTime";
import { getAllOrders } from "@/ReactQuery/FunctionsReactQuery";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(80);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Orders", limit, page],
    queryFn: () => getAllOrders(limit, page),
    keepPreviousData: true,
  });

  const filteredOrders = useMemo(() => {
    if (!orders?.data) return [];
    return orders.data.filter(
      (order) =>
        order.id.toString().toLowerCase().includes(filterText.toLowerCase()) ||
        order.shippingAddress.city
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
        order.paymentMethodType.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [orders?.data, filterText]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Order Time",
      selector: (row) => {
        const { formattedDate } = formatDateTime(row.createdAt);
        return `${formattedDate}`;
      },
      sortable: true,
    },
    {
      name: "Method",
      selector: (row) => row.paymentMethodType,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        const isPaid = row.isPaid;
        const isDelivered = row.isDelivered;
        let status = "";
        if (isDelivered) {
          status = "Delivered";
        } else {
          status = isPaid ? "Processing" : "Pending";
        }
        return status;
      },
      sortable: true,
      cell: (row) => {
        const isPaid = row.isPaid;
        const isDelivered = row.isDelivered;
        let status = "";
        if (isDelivered) {
          status = "Delivered";
        } else {
          status = isPaid ? "Processing" : "Pending";
        }
        return (
          <span
            className={
              isDelivered
                ? "text-[#10b981]"
                : isPaid
                ? "text-[#6366f1]"
                : "text-[#f97316]"
            }
          >
            {status}
          </span>
        );
      },
    },
    {
      name: "City",
      selector: (row) => row.shippingAddress.city,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) => row.totalOrderPrice,
      sortable: true,
    },
    {
      name: "Total Items In Order",
      selector: (row) => row.cartItems.length,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Link
          href={`/dashboard/orders/${row._id}`}
          className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-xs py-2 px-4 disabled:bg-opacity-90 bg-[#3D5A80] hover:bg-[#3D5A80] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 "
        >
          Details
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <div className="w-full flex items-center justify-between">
        <h4 class="text-[20px] text-[#9B9B9B] leading-[1.3] capitalize font-[600]">
          Orders
        </h4>
        <div className="relative h-[50px]">
          <input
            type="text"
            placeholder="Filter by ID, City, or Method"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full h-full bg-transparent border-[1px] rounded-[8px] border-[#DDD] focus:border-[#98C1D9] hover:border-[#98C1D9] pl-[15px] pr-[50px]"
          />
          <button
            onClick={handleClear}
            className="group inline-block absolute top-[50%] translate-y-[-50%] right-[20px]"
          >
            <svg
              class="fill-[#3D5A80] group-hover:fill-[#98C1D9]"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.5308 18.4693L14.8368 13.7762C16.1973 12.1428 16.8757 10.0478 16.7309 7.92691C16.5861 5.80604 15.6293 3.82265 14.0593 2.38932C12.4894 0.955989 10.4274 0.183083 8.30213 0.231383C6.17687 0.279683 4.15205 1.14547 2.64888 2.64864C1.14571 4.15181 0.279927 6.17663 0.231627 8.30188C0.183327 10.4271 0.956234 12.4892 2.38956 14.0591C3.82289 15.629 5.80629 16.5859 7.92715 16.7307C10.048 16.8755 12.1431 16.1971 13.7765 14.8365L18.4696 19.5306C18.5393 19.6003 18.622 19.6556 18.713 19.6933C18.8041 19.731 18.9017 19.7504 19.0002 19.7504C19.0988 19.7504 19.1963 19.731 19.2874 19.6933C19.3784 19.6556 19.4612 19.6003 19.5308 19.5306C19.6005 19.4609 19.6558 19.3782 19.6935 19.2871C19.7312 19.1961 19.7506 19.0985 19.7506 19C19.7506 18.9014 19.7312 18.8038 19.6935 18.7128C19.6558 18.6218 19.6005 18.539 19.5308 18.4693ZM1.75021 8.49997C1.75021 7.16495 2.14609 5.8599 2.88779 4.74987C3.62949 3.63984 4.6837 2.77467 5.9171 2.26378C7.1505 1.75289 8.5077 1.61922 9.81707 1.87967C11.1264 2.14012 12.3292 2.78299 13.2732 3.727C14.2172 4.671 14.8601 5.87374 15.1205 7.18311C15.381 8.49248 15.2473 9.84968 14.7364 11.0831C14.2255 12.3165 13.3603 13.3707 12.2503 14.1124C11.1403 14.8541 9.83524 15.25 8.50021 15.25C6.71061 15.248 4.99488 14.5362 3.72944 13.2708C2.464 12.0053 1.7522 10.2896 1.75021 8.49997Z"></path>
            </svg>
          </button>
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "#DDD",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#DDD",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "#DDD",
        },
      },
    },
  };

  return (
    <div>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={filteredOrders}
        pagination
        paginationServer
        paginationTotalRows={orders?.results || 0}
        onChangeRowsPerPage={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
        onChangePage={(page) => setPage(page)}
        paginationComponentOptions={{
          rowsPerPageText: "Rows per page:",
          rangeSeparatorText: "of",
          noRowsPerPage: false,
        }}
        progressPending={isLoading}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
      />
      {error && <div>Error fetching data: {error.message}</div>}
    </div>
  );
};

export default Orders;
