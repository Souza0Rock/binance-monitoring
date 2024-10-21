import React from "react";
import { IButtonProps } from "./interface";
import { LoadingSpinner } from "../LoadingSpinner";

export const Button: React.FC<IButtonProps> = ({
  label,
  className = "",
  loading = false,
  disabled = false,
  outlined = false,
  onClick = () => {},
}) => {
  const isDisabled = disabled || loading;

  const buttonClasses = `
    p-2 border rounded-md outline-0 cursor-pointer transition-all duration-300 text-[16px] 
    ${
      isDisabled
        ? "bg-gray-400 text-gray-700 cursor-not-allowed border-gray-400"
        : ""
    }
    ${
      !isDisabled && outlined
        ? "bg-transparent text-[#0c162d] hover:bg-slate-50 border-[#0c162d]"
        : ""
    }
    ${
      !isDisabled && !outlined
        ? "bg-slate-50 text-[#0c162d] hover:slate-200 border-[#0c162d]"
        : ""
    }
    ${className}
  `.trim();

  return (
    <button
      data-testid="button-component"
      disabled={isDisabled}
      onClick={onClick}
      className={buttonClasses}
    >
      {loading ? <LoadingSpinner size={14} color="#0c162d" /> : label}
    </button>
  );
};
