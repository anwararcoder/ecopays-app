import React from 'react'
import AccordionItem from '../Accordion/AccordionItem'
import Slider from 'rc-slider'

const SearchSidebar = ({ categoriesList, brandsList, rangePriceValue, setRangePriceValue, selectedCategories, selectedBrands, setSelectedCategories, setSelectedBrands }) => {
    const handleChangeCategories = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleChangeBrands = (id) => {
        setSelectedBrands((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };
    return (
        <>
            <AccordionItem open={true} className='mb-[30px]' title="Categories">
                <ul className='flex gap-[20px] flex-col'>
                    {categoriesList?.map((category) => (
                        <li key={category._id} className="flex items-center space-x-2">
                            <label htmlFor={`category-${category._id}`} className="checkbox">
                                <input
                                    type="checkbox"
                                    id={`category-${category._id}`}
                                    checked={selectedCategories.includes(category._id)}
                                    onChange={() => handleChangeCategories(category._id)}
                                    className="accent-[#98C1D9] text-white w-[22px] h-[22px]"
                                />
                                <span>{category.name}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </AccordionItem>
            <AccordionItem open={true} className='mb-[30px]' title="Brands">
                <ul className='flex gap-[20px] flex-col'>
                    {brandsList?.map((brand) => (
                        <li key={brand._id} className="flex items-center space-x-2">
                            <label htmlFor={`brand-${brand._id}`} className="checkbox">
                                <input
                                    type="checkbox"
                                    id={`brand-${brand._id}`}
                                    checked={selectedBrands.includes(brand._id)}
                                    onChange={() => handleChangeBrands(brand._id)}
                                    className="accent-[#98C1D9] text-white w-[22px] h-[22px]"
                                />
                                <span>{brand.name}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </AccordionItem>
            <div>
                <h4 className="text-[24px] leading-[1.3] capitalize font-[600] mb-[30px]">Price range</h4>
                <Slider
                    min={0}
                    range
                    value={rangePriceValue}
                    onChange={(newValue) => setRangePriceValue(newValue)}
                />
                <div className='grid grid-cols-2 mt-[20px] gap-[20px]'>
                    <div>
                        <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Min price</span>
                        <div className='flex items-center justify-between border-[1px] border-[#DDD] py-[8px] px-[12px] rounded-[50px] text-[13px] font-[600]'>
                            {rangePriceValue[0]}
                            <span>$</span>
                        </div>
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Max price</span>
                        <div className='flex items-center justify-between border-[1px] border-[#DDD] py-[8px] px-[12px] rounded-[50px] text-[13px] font-[600]'>
                            {rangePriceValue[1]}
                            <span>$</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchSidebar
