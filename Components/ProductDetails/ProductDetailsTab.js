import Link from 'next/link';
import React, { useState } from 'react'
import Rating from 'react-rating'
import WriteReview from '../Utilities/WriteReview';

const ProductDetailsTab = ({ product, isLogged, userId, productRefetch }) => {
    const [isActiveTab, setIsActiveTab] = useState(1)
    const [isActiveWriteReview, setIsActiveWriteReview] = useState(false)
    const totalReviews = product?.data.reviews.length;
    const ratingsCount = [0, 0, 0, 0, 0]; // [1-star, 2-star, 3-star, 4-star, 5-star]

    product?.data.reviews.forEach(review => {
        ratingsCount[review.rating - 1]++;
    });

    const isInReviews = product?.data.reviews.some((item) => item.user._id === userId);

    return (
        <>
            <ul className='grid grid-cols-2'>
                <li className={`text-center h-[60px] border-[#DDD] border-[1px] flex items-center justify-center cursor-pointer bg-[#E0FBFC] font-[600] text-[#3D5A80]${isActiveTab === 1 ? ' border-[#98C1D9] text-[#98C1D9]' : ''}`} onClick={() => setIsActiveTab(1)}>
                    Product Details
                </li>
                <li className={`text-center h-[60px] border-[#DDD] border-[1px] flex items-center justify-center cursor-pointer bg-[#E0FBFC] font-[600] text-[#3D5A80]${isActiveTab === 2 ? ' border-[#98C1D9] text-[#98C1D9]' : ''}`} onClick={() => setIsActiveTab(2)}>
                    Reviews & Ratings
                </li>
            </ul>
            {isActiveTab === 1 && <div className='py-[50px] px-[30px] border-b-[#DDD] border-b-[1px]'>
                <h4 className="text-lg font-semibold mb-[25px]">Product Details</h4>
                <ul className='text-[16px] leading-[27px] text-[#9B9B9B] list-disc pl-[20px]'>
                    <li>Regular fit, mid-weight t-shirt</li>
                    <li>Natural color, 100% premium combed organic cotton</li>
                    <li>Quality cotton grown without the use of herbicides or pesticides - GOTS certified</li>
                    <li>Soft touch water based printed in the USA</li>
                </ul>
            </div>}
            {isActiveTab === 2 && <div className='py-[50px] px-[30px] border-b-[#DDD] border-b-[1px]'>
                <h4 className="text-lg font-semibold mb-[25px]">Reviews & Ratings</h4>
                <div className={`grid grid-cols-1 md:grid-cols-2 ${!isInReviews ? 'lg:grid-cols-3' : ''} gap-[30px]`}>
                    <div className='md:border-r-[1px] border-[#DDD] flex justify-center'>
                        <div>
                            <span className='w-[100px] h-[100px] inline-flex items-center justify-center bg-[#98C1D9] rounded-full text-[28px] text-white font-[600]' style={{ fontFamily: "Saira" }}>{product?.data.ratingsAverage || 0}</span>
                            <div className='mt-[20px]'>
                                <Rating
                                    initialRating={product?.data.ratingsAverage}
                                    readonly
                                    emptySymbol={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.987 511" className="fill-[#3D5A80] w-[20px] h-[20px]"><g><path d="M114.594 491.14c-5.61 0-11.18-1.75-15.934-5.187a27.223 27.223 0 0 1-10.582-28.094l32.938-145.09L9.312 214.81a27.188 27.188 0 0 1-7.976-28.907 27.208 27.208 0 0 1 23.402-18.71l147.797-13.419L230.97 17.027C235.277 6.98 245.089.492 255.992.492s20.715 6.488 25.024 16.512l58.433 136.77 147.774 13.417c10.882.98 20.054 8.344 23.425 18.711 3.372 10.368.254 21.739-7.957 28.907L390.988 312.75l32.938 145.086c2.414 10.668-1.727 21.7-10.578 28.098-8.832 6.398-20.61 6.89-29.91 1.3l-127.446-76.16-127.445 76.203c-4.309 2.559-9.11 3.864-13.953 3.864zm141.398-112.874c4.844 0 9.64 1.3 13.953 3.859l120.278 71.938-31.086-136.942a27.21 27.21 0 0 1 8.62-26.516l105.473-92.5-139.543-12.671a27.18 27.18 0 0 1-22.613-16.493L255.992 39.895 200.844 168.96c-3.883 9.195-12.524 15.512-22.547 16.43L38.734 198.062l105.47 92.5c7.554 6.614 10.858 16.77 8.62 26.54l-31.062 136.937 120.277-71.914c4.309-2.559 9.11-3.86 13.953-3.86zm-84.586-221.848s0 .023-.023.043zm169.13-.063.023.043c0-.023 0-.023-.024-.043zm0 0"></path></g></svg>}
                                    fullSymbol={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.987 511" className="fill-[#98C1D9] w-[20px] h-[20px]"><g><path d="M510.652 185.902a27.158 27.158 0 0 0-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 0 0 1.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0 0 10.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 0 0 7.98-28.927zm0 0"></path></g></svg>}
                                />
                            </div>
                            <h5 className='text-md font-semibold text-center'>{product?.data.ratingsAverage} Out Of {product?.data.ratingsQuantity}</h5>
                        </div>
                    </div>
                    <div className={`${!isInReviews ? 'lg:border-r-[1px] border-[#DDD]' : ''}flex items-center justify-center `}>
                        <div>
                            {ratingsCount.map((count, index) => (
                                <div className='text-sm font-semibold capitalize leading-[2] flex items-center' key={index}>
                                    <div>{index + 1} star</div>
                                    <div className='w-[200px] my-0 mx-[10px] bg-[#e0e0e0] rounded-xl overflow-hidden'>
                                        <div style={{ width: `${(count / totalReviews) * 100}%` }} className='rounded-xl overflow-hidden h-[10px] bg-[#98C1D9]'></div>
                                    </div>
                                    <div>{count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {!isInReviews ? <div>
                        <h4 className="text-lg font-semibold mb-[25px]">Reviews This Product</h4>
                        <p className='text-[16px] leading-[27px] text-[#9B9B9B] mb-[25px]'>share your thoughts with other customers</p>
                        {isLogged ? <button onClick={() => setIsActiveWriteReview(!isActiveWriteReview)} className="btn-1 btn-4"><span>{!isActiveWriteReview ? "Write your Review" : "Close"}</span></button> : <><Link className="btn-1 btn-3" href="/login"><span>Sign up / Sign in</span></Link></>}
                    </div> : null}

                </div>
                {isActiveWriteReview && <div className='mt-[50px]'><WriteReview productId={product?.data._id} userId={userId} productRefetch={productRefetch} /></div>}
            </div>}
            <div className='mt-[50px] flex flex-col gap-[30px]'>
                {product?.data.reviews.map( (item, index) => {
                    return(<div key={index} className="flex items-start space-x-[20px]">
                        <div className="shrink-0">
                            <span className="w-[100px] uppercase h-[100px] inline-flex items-center justify-center bg-[#98C1D9] rounded-full text-[28px] text-white font-[600]" style={{ fontFamily: "Saira" }}>{(item.user.name).split(' ').map(part => part.charAt(0)).join('')}</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-medium capitalize">{item.user.name}</h4>
                            <div className='my-[15px]'>
                            <Rating
                            initialRating={item.rating}
                            readonly
                            emptySymbol={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.987 511" className="fill-[#3D5A80] w-[20px] h-[20px]"><g><path d="M114.594 491.14c-5.61 0-11.18-1.75-15.934-5.187a27.223 27.223 0 0 1-10.582-28.094l32.938-145.09L9.312 214.81a27.188 27.188 0 0 1-7.976-28.907 27.208 27.208 0 0 1 23.402-18.71l147.797-13.419L230.97 17.027C235.277 6.98 245.089.492 255.992.492s20.715 6.488 25.024 16.512l58.433 136.77 147.774 13.417c10.882.98 20.054 8.344 23.425 18.711 3.372 10.368.254 21.739-7.957 28.907L390.988 312.75l32.938 145.086c2.414 10.668-1.727 21.7-10.578 28.098-8.832 6.398-20.61 6.89-29.91 1.3l-127.446-76.16-127.445 76.203c-4.309 2.559-9.11 3.864-13.953 3.864zm141.398-112.874c4.844 0 9.64 1.3 13.953 3.859l120.278 71.938-31.086-136.942a27.21 27.21 0 0 1 8.62-26.516l105.473-92.5-139.543-12.671a27.18 27.18 0 0 1-22.613-16.493L255.992 39.895 200.844 168.96c-3.883 9.195-12.524 15.512-22.547 16.43L38.734 198.062l105.47 92.5c7.554 6.614 10.858 16.77 8.62 26.54l-31.062 136.937 120.277-71.914c4.309-2.559 9.11-3.86 13.953-3.86zm-84.586-221.848s0 .023-.023.043zm169.13-.063.023.043c0-.023 0-.023-.024-.043zm0 0"></path></g></svg>}
                            fullSymbol={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.987 511" className="fill-[#98C1D9] w-[20px] h-[20px]"><g><path d="M510.652 185.902a27.158 27.158 0 0 0-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 0 0 1.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0 0 10.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 0 0 7.98-28.927zm0 0"></path></g></svg>}
                        />
                            </div>
                            <p className="text-[16px] leading-[27px] text-[#9B9B9B]">{item.review}</p>
                        </div>
                    </div>)
                } )}
            </div>
        </>
    )
}

export default ProductDetailsTab
