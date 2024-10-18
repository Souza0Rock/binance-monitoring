import React from "react";

export const Checkbox: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
      />
      <label
        htmlFor={id}
        className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
      >
        label
      </label>
    </div>
  );
};
