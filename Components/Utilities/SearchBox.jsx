"use client";
import React, { useState } from "react";
import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getAllCategories } from "@/ReactQuery/FunctionsReactQuery";

const SearchBox = () => {
  const searchParams = useSearchParams();
    const keywordParams = searchParams.get('keyword')
  const router = useRouter();
  const [keyword, setKeyword] = useState(keywordParams ? keywordParams : '');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categories } = useQuery({
    queryKey: ["Categories"],
    queryFn: getAllCategories,
  });

  const optionsCategoriesList = categories?.data.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!keyword) {
      toast.error("Please Type On Search Box");
    }
    if (keyword.trim()) {
      router.push(
        `/search?keyword=${keyword}${
          selectedCategory ? `&category[in][]=${selectedCategory}` : ""
        }`
      );
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="search-box w-full max-w-[500px] relative flex items-center bg-[#F5F5F5] rounded-[3px]"
    >
      <Select
        options={optionsCategoriesList}
        onChange={(option) => setSelectedCategory(option ? option.value : null)}
        placeholder="All Categories..."
        className="categories-list"
      />
      <div className="relative w-[calc(100%-170px)] h-[50px]">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Here..."
          className="w-full h-full bg-transparent border-l-[1px] border-[#DDD] pl-[15px] pr-[50px]"
        />
        <button
          type="submit"
          className="group inline-block absolute top-[50%] translate-y-[-50%] right-[20px]"
        >
          <svg
            className="fill-[#3D5A80] group-hover:fill-[#98C1D9]"
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
    </form>
  );
};

export default SearchBox;
