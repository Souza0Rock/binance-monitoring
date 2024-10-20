import React from "react";
import { IButtonProps } from "./interface";
import { LoadingSpinner } from "../LoadingSpinner";

export const Button: React.FC<IButtonProps> = ({
  label,
  className = "",
  loading = false,
  disabled = false,
  onClick = () => {},
}) => {
  const isDisabled = disabled ?? loading;

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`p-2 rounded-md border-none outline-0 cursor-pointer transition-all duration-300 text-[16px] text-[#0c162d] ${
        isDisabled ? "bg-[#fdef8c] cursor-not-allowed" : "bg-[#fff]"
      } ${className} button-component`}
    >
      {loading ? <LoadingSpinner size={14} color="#0c162d" /> : label}
    </button>
  );
};
