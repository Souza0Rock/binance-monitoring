import React from "react";
import { ILoadingSpinnerProps } from "./types";

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  size = 48,
  color = "#f3fcff",
}) => {
  return (
    <span
      className="inline-block rounded-full border-solid border-r-transparent box-border animate-spin"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: "3px",
        borderColor: `${color}`,
        borderRightColor: "transparent",
      }}
    />
  );
};
