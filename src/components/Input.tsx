import { cn } from "@/utils/classNames";
import React from "react";

export const Input = React.forwardRef(
  Object.assign(
    (
      props: React.InputHTMLAttributes<HTMLInputElement>,
      ref: React.Ref<HTMLInputElement>
    ) => {
      const { className, ...rest } = props;
      return (
        <input
          ref={ref}
          className={cn("border border-gray-300 p-2 rounded-md", className)}
          {...rest}
        />
      );
    },
    { displayName: "Input" }
  )
);
