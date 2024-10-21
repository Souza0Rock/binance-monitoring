import React from "react";
import { IInputProps } from "./interface";

export const Input: React.FC<IInputProps> = ({
  label = "",
  value,
  onChange = () => {},
}) => {
  return (
    <div className="relative z-0 w-full group">
      <input
        type="text"
        value={value}
        id="floating-input"
        placeholder=""
        onChange={(e) => onChange(e.target.value)}
        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-900 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
      />
      <label
        htmlFor="floating-input"
        className="px-1 absolute text-sm text-gray-500 leading-none bg-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        {label}
      </label>
    </div>
  );
};
