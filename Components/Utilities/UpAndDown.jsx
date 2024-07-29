import React from "react";

const UpAndDown = ({className}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className ? className : 'w-[20px] inline-block translate-x-[10px]'}
    >
      <g>
        <path
          d="M17.519 8.698a2.068 2.068 0 0 0-3.038 0l-6 7a2 2 0 1 0 3.038 2.604L14 15.407V34a2 2 0 0 0 4 0V15.407l2.481 2.895a2 2 0 0 0 3.038-2.604zM39.302 29.481a2.002 2.002 0 0 0-2.82.217L34 32.593V14a2 2 0 0 0-4 0v18.593l-2.481-2.895a2 2 0 1 0-3.038 2.604l6 7a2 2 0 0 0 3.038 0l6-7a2 2 0 0 0-.217-2.82z"
        ></path>
      </g>
    </svg>
  );
};

export default UpAndDown;
