import React from "react";
import { IInputProps } from "./types";

export const Input: React.FC<IInputProps> = ({
  name,
  label,
  value,
  onChange,
}) => {
  return (
    // <div className={`input-component relative ${className}`}>
    //   <input
    //     name={name}
    //     type="text"
    //     value={value}
    //     onChange={onChange}
    //     required
    //     inputMode={inputMode}
    //     className={`h-12 w-full text-[16px] text-[#000] px-4 bg-transparent border border-[#000] outline-none rounded-md
    //       focus:border-[#000] focus:outline-none
    //       peer
    //     `}
    //   />
    //   <label
    //     htmlFor={name}
    //     className={`absolute top-1/2 left-4 leading-none transform -translate-y-1/2 text-[16px] text-[#000] px-1 pointer-events-none transition-all duration-300 bg-[#f2f3f7] line-height-4 peer-focus:top-0 peer-focus:text-[14px] peer-valid:top-0 peer-valid:text-[14px]`}
    //   >
    //     {label}
    //   </label>
    // </div>
    <div className="relative z-0 w-full group">
      <input
        type="text"
        id="floating_input"
        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-900 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor="floating_input"
        className="absolute text-sm text-gray-500 leading-none bg-[#f2f3f7] duration-300 transform -translate-y-6 scale-75 top-3 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        Seu nome
      </label>
    </div>
  );
};
