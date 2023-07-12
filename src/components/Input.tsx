import { cn } from "@/utils/classNames";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorState?: boolean;
}

export const Input = React.forwardRef(
  Object.assign(
    (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
      const { className, errorState, ...rest } = props;
      return (
        <input
          ref={ref}
          className={cn(
            "border border-gray-300 p-2 rounded-md",
            {
              "border-red-500": errorState,
            },
            className
          )}
          {...rest}
        />
      );
    },
    { displayName: "Input" }
  )
);
