import Link from "next/link";
import { useState } from "react";

const DropdownMenu = ({ options, className  }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:border-blue-300"
      >
        Dropdown
      </button>

      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={className ? className : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"}
              >
                {item.svg && item.svg}
                <span className="inline-block">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
