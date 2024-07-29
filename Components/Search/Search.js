"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Breadcrumb from '../Utilities/Breadcrumb';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import 'rc-slider/assets/index.css'; // Import the CSS for styling
import ArDropdownList from '../Utilities/ArDropdownList';
import { getAllBrands, getAllCategories, getAllProducts } from '@/ReactQuery/FunctionsReactQuery';
import { getBrandsIds, getCategoriesIds, getSubCategoriesIds } from '@/Utilities/HelperFunctions';
import SearchSidebar from './SearchSidebar';
import ProductCard from '../Utilities/ProductCard';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import Pagination from '../Utilities/Pagination';
import ReactPaginate from 'react-paginate';

const Search = () => {
    const searchParams = useSearchParams();
    const keywordParams = searchParams.get('keyword')
    const categoriesParams = useMemo(() => searchParams.getAll('category[in][]'), [searchParams]);
    const subCategoriesParams = useMemo(() => searchParams.getAll('subcategory[in][]'), [searchParams]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const [rangePriceValue, setRangePriceValue] = useState([0, 500]);
    const [selectedOption, setSelectedOption] = useState('');
    const [sorting, setSorting] = useState('');

    const [resultsPerPage, setResultsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);

    const optionsUser = [
        {
            value: "default-sorting",
            label: "Default Sorting",
            function: () => {
                setSorting('')
            }
        },
        {
            value: "low-to-hight",
            label: "Low to Hight",
            function: () => {
                setSorting("+price")
            }
        },
        {
            value: "high-to-low",
            label: "High to Low",
            function: () => {
                setSorting("-price")
            }
        },
        {
            value: "best-seller",
            label: "Best Seller",
            function: () => {
                setSorting("-sold")
            }
        },
        {
            value: "best-rated",
            label: "Best Rated",
            function: () => {
                setSorting("-ratingsQuantity")
            }
        }
    ];

    useEffect(() => {
        if (categoriesParams.length > 0) {
            setSelectedCategories(categoriesParams);
        }
    }, [categoriesParams]);

    const { data: categories } = useQuery({ queryKey: ["Categories"], queryFn: getAllCategories });
    const { data: brands } = useQuery({ queryKey: ["Brands"], queryFn: getAllBrands });

    const categoriesList = categories?.data.map(({ _id, name }) => ({ _id, name })) || [];
    const brandsList = brands?.data.map(({ _id, name }) => ({ _id, name })) || [];

    const {
        data: products,
        isLoading: isLoadingProduct,
        isError: isErrorProduct,
        refetch: refetchProduct
    } = useQuery({
        queryKey: ["Products", selectedCategories, selectedBrands, keywordParams, rangePriceValue, sorting],
        queryFn: () => getAllProducts(
            resultsPerPage,
            getCategoriesIds(selectedCategories.length > 0 ? selectedCategories : categoriesParams),
            getBrandsIds(selectedBrands.length > 0 ? selectedBrands : []),
            getSubCategoriesIds(subCategoriesParams.length > 0 ? subCategoriesParams : []),
            keywordParams,
            rangePriceValue[0],
            rangePriceValue[1],
            sorting,
            currentPage
        )
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            refetchProduct();
        }, 1000);

        return () => clearTimeout(timer);
    }, [selectedCategories, categoriesParams, selectedBrands, keywordParams, rangePriceValue, sorting, currentPage, refetchProduct]);

    if (isErrorProduct) {
        toast.error("Products Not Here");
        return null;
    }

    return (
        <>
            <Breadcrumb pageTitle="Search" />
            <div className='relative mb-[100px]'>
                <div className='container px-[15px] mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-7 gap-[50px]'>
                        <div className='col-span-1 md:col-span-2'>
                            <SearchSidebar categoriesList={categoriesList} brandsList={brandsList} rangePriceValue={rangePriceValue} setRangePriceValue={setRangePriceValue} selectedCategories={selectedCategories} selectedBrands={selectedBrands} setSelectedCategories={setSelectedCategories} setSelectedBrands={setSelectedBrands} />
                        </div>
                        <div className='col-span-1 md:col-span-5'>
                            <div className='mb-[50px]'>
                                <div className='flex items-center justify-between gap-[30px]'>
                                    <div>
                                        <h4 className="text-[20px] text-[#9B9B9B] leading-[1.3] capitalize font-[600]">Showing results search</h4>
                                    </div>
                                    <div>
                                        <ArDropdownList
                                            className="min-w-[200px] border-[#DDD] border-[1px] rounded-[3px] px-[15px] text-[16px] leading-[1.1] font-[500] h-[50px] capitalize"
                                            svg={false}
                                            options={optionsUser}
                                            selectedOption={selectedOption}
                                            onOptionSelect={(item) => setSelectedOption(item)}
                                            placeholder="Default Sorting"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]'>
                                {isLoadingProduct && [1, 2, 3, 4, 5, 6, 7, 8].map(item => (<div key={item} className=''>
                                    <div className='h-[330px] overflow-hidden w-full rounded-3xl'>
                                        <Skeleton height={330} />
                                    </div>
                                    <Skeleton height={25} className='mt-[25px]' />
                                    <Skeleton height={20} width={100} className='mb-[12px]' />
                                    <div className='flex items-center justify-between'>
                                        <Skeleton height={30} width={60} />
                                        <Skeleton height={20} width={120} />
                                    </div>
                                </div>))}
                                {products?.data.length >= 1 ? <>{products?.data.map(product => {
                                    return (
                                        <ProductCard key={product._id} product={product} />
                                    )
                                })}</> : <div className='py-[100px] text-center col-span-1 md:col-span-2 lg:col-span-3'>
                                    <h4 className="text-[28px] leading-[1.3] capitalize font-[600]">No Product Found</h4>
                                </div>}

                            </div>
                        </div>
                    </div>
                    {products?.data.length >= 1 ? <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={products?.paginationResult.numberOfPages}
                        onPageChange={(data) => {
                            let selected = data.selected;
                            setCurrentPage(selected + 1);
                        }}
                        containerClassName={'ar-pagination'}
                        activeClassName={'active'}
                    /> : null}

                </div>
            </div>
        </>
    );
};

export default Search;
