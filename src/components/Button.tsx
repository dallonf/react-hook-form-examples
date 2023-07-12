import { cn } from "@/utils/classNames";
import React from "react";

export const Button = React.forwardRef(
  Object.assign(
    (
      props: React.ButtonHTMLAttributes<HTMLButtonElement>,
      ref: React.Ref<HTMLButtonElement>
    ) => {
      const { className, ...rest } = props;
      return (
        <button
          ref={ref}
          className={cn(
            "border border-blue-800 bg-blue-400 text-white p-2 rounded-md shadow-sm",
            className
          )}
          {...rest}
        />
      );
    },
    { displayName: "Input" }
  )
);
