import React from "react";
import Rating from "react-rating";
import { FacebookIcon, FacebookShareButton } from "react-share";

const ProductDetailsBox = ({
  product,
  colorItem,
  setColorItem,
  category,
  subCategory,
  isInWishlist,
  activeIndexColor,
  setActiveIndexColor,
  cartHandelClick,
  wishlistHandelClick,
}) => {
  return (
    <>
      <p className="text-[15px] mb-1">
        {category?.data.name}{" "}
        {subCategory?.data.name ? ` : ${subCategory?.data.name}` : ""}
      </p>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2.5">
        {product?.data.title}
      </h2>
      <div className="flex items-center justify-between flex-wrap gap-[20px]">
        <div>
          <div className="text-[16px] leading-[27px] text-[#9B9B9B]">
            {product?.data.description}
          </div>
          {product?.data.ratingsQuantity <= 0 ? null : (
            <div className="flex items-center gap-[12px] mt-[12px]">
              <Rating
                initialRating={product?.data.ratingsAverage}
                readonly
                emptySymbol={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 511.987 511"
                    className="fill-[#3D5A80] w-[20px] h-[20px]"
                  >
                    <g>
                      <path d="M114.594 491.14c-5.61 0-11.18-1.75-15.934-5.187a27.223 27.223 0 0 1-10.582-28.094l32.938-145.09L9.312 214.81a27.188 27.188 0 0 1-7.976-28.907 27.208 27.208 0 0 1 23.402-18.71l147.797-13.419L230.97 17.027C235.277 6.98 245.089.492 255.992.492s20.715 6.488 25.024 16.512l58.433 136.77 147.774 13.417c10.882.98 20.054 8.344 23.425 18.711 3.372 10.368.254 21.739-7.957 28.907L390.988 312.75l32.938 145.086c2.414 10.668-1.727 21.7-10.578 28.098-8.832 6.398-20.61 6.89-29.91 1.3l-127.446-76.16-127.445 76.203c-4.309 2.559-9.11 3.864-13.953 3.864zm141.398-112.874c4.844 0 9.64 1.3 13.953 3.859l120.278 71.938-31.086-136.942a27.21 27.21 0 0 1 8.62-26.516l105.473-92.5-139.543-12.671a27.18 27.18 0 0 1-22.613-16.493L255.992 39.895 200.844 168.96c-3.883 9.195-12.524 15.512-22.547 16.43L38.734 198.062l105.47 92.5c7.554 6.614 10.858 16.77 8.62 26.54l-31.062 136.937 120.277-71.914c4.309-2.559 9.11-3.86 13.953-3.86zm-84.586-221.848s0 .023-.023.043zm169.13-.063.023.043c0-.023 0-.023-.024-.043zm0 0"></path>
                    </g>
                  </svg>
                }
                fullSymbol={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 511.987 511"
                    className="fill-[#98C1D9] w-[20px] h-[20px]"
                  >
                    <g>
                      <path d="M510.652 185.902a27.158 27.158 0 0 0-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 0 0 1.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0 0 10.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 0 0 7.98-28.927zm0 0"></path>
                    </g>
                  </svg>
                }
              />
              <p className="text-[16px] leading-[27px] text-[#9B9B9B]">
                {product?.data.ratingsAverage} ({product?.data.ratingsQuantity})
              </p>
            </div>
          )}
        </div>
        <div>
          <FacebookShareButton
            url={`/products/${product?.data._id}`}
            quote={product?.data.title}
            className="share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>
      <div className="mt-[30px] pt-[30px] border-t-[1px] border-[#DDD]">
        <h3 className="text-2xl font-semibold mb-[25px]">
          {product?.data.price} EG
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
          <div className="flex flex-col p-5 rounded-2xl bg-red-50 dark:bg-opacity-90">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 8H8"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 11H6"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 14H4"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="mt-2.5">
              <p className="font-semibold text-slate-900">Free shipping</p>
              <p className="text-slate-500 mt-0.5 text-sm">
                On orders over $50.00
              </p>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded-2xl bg-sky-50 dark:bg-opacity-90">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M13.7 4.44995L17.6799 6.74994L21.6199 4.45996"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M17.6799 10.82V6.73999"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M16.74 2.21L14.34 3.53996C13.8 3.83996 13.35 4.59995 13.35 5.21995V7.75999C13.35 8.37999 13.79 9.13998 14.34 9.43998L16.74 10.77C17.25 11.06 18.09 11.06 18.61 10.77L21.01 9.43998C21.55 9.13998 22 8.37999 22 7.75999V5.21995C22 4.59995 21.56 3.83996 21.01 3.53996L18.61 2.21C18.1 1.93 17.26 1.93 16.74 2.21Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2.34998 15.45L6.31998 17.7499L10.27 15.46"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M6.31995 21.82V17.74"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M5.39 13.21L2.99001 14.54C2.45001 14.84 2 15.5999 2 16.2199V18.76C2 19.38 2.44001 20.14 2.99001 20.44L5.39 21.77C5.9 22.06 6.73999 22.06 7.25999 21.77L9.66 20.44C10.2 20.14 10.65 19.38 10.65 18.76V16.2199C10.65 15.5999 10.21 14.84 9.66 14.54L7.25999 13.21C6.73999 12.93 5.9 12.93 5.39 13.21Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="mt-2.5">
              <p className="font-semibold text-slate-900">
                Very easy to return
              </p>
              <p className="text-slate-500 mt-0.5 text-sm">
                Just phone number.
              </p>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded-2xl bg-green-50 dark:bg-opacity-90">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M15 3C16.95 8.84 16.95 15.16 15 21"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="mt-2.5">
              <p className="font-semibold text-slate-900">
                Nationwide Delivery
              </p>
              <p className="text-slate-500 mt-0.5 text-sm">
                Fast delivery nationwide.
              </p>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded-2xl bg-amber-50 dark:bg-opacity-90">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 7.5V16.5"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M17 3V7H21"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M22 2L17 7"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="mt-2.5">
              <p className="font-semibold text-slate-900">Refunds policy</p>
              <p className="text-slate-500 mt-0.5 text-sm">
                60 days return for any reason
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[30px] pt-[30px] border-t-[1px] border-[#DDD]">
        <div className="flex items-center flex-wrap gap-[30px]">
          <h3 className="text-2xl font-semibold">Colors</h3>
          {product?.data.availableColors.length > 0 ? (
            <>
              <ul className="flex items-center gap-[15px] flex-wrap">
                {product?.data.availableColors.map((color, index) => {
                  return (
                    <li
                      onClick={() => {
                        setActiveIndexColor(
                          index === activeIndexColor ? null : index
                        );
                        setColorItem(index === activeIndexColor ? "" : color);
                      }}
                      key={index}
                      className={`rounded-3xl cursor-pointer`}
                      style={{
                        backgroundColor: `${
                          activeIndexColor === index ? `${color}` : ""
                        }`,
                      }}
                    >
                      <span
                        className={`flex w-[50px] h-[25px] border-[3px] border-[#FFF] rounded-3xl cursor-pointer m-[3px]`}
                        style={{ backgroundColor: `${color}` }}
                      ></span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </div>
      </div>
      <div className="mt-[30px] flex items-center gap-[30px] flex-wrap">
        {/* <div className='border-[1px] border-[#DDD] rounded-[3px] p-[15px] flex items-center gap-[20px] text-[#3D5A80] h-[60px]'>
                                        <button onClick={() => productCountHandel.decrease()} className='hover:text-[#98C1D9] font-[600] text-[25px] text-[#9B9B9B]'>-</button>
                                        <span className='text-[22px] font-[500]' style={{ fontFamily: "Saira" }}>{productCount}</span>
                                        <button onClick={() => productCountHandel.increase()} className='hover:text-[#98C1D9] font-[600] text-[25px] text-[#9B9B9B]'>+</button>
                                    </div> */}

        {product?.data.quantity <= 0 ? null : (
          <div>
            <button
              onClick={() => cartHandelClick(product?.data._id, colorItem)}
              className="btn-1 btn-3"
            >
              <span>Add To Cart</span>
            </button>
          </div>
        )}
        <div>
          <button
            onClick={() => wishlistHandelClick(product?.data._id)}
            className="flex items-center justify-center h-[60px] w-[60px] rounded-[3px] bg-[#E0FBFC] border-[1px] border-[#DDD] text-[#3D5A80]"
          >
            <svg
              className={`w-7 h-7 hover:fill-[#e74c3c] hover:text-[#e74c3c] ${
                isInWishlist ? "fill-[#e74c3c]" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsBox;
