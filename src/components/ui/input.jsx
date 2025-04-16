import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type,...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input border-gray-300 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-blue-700 focus:ring-blue-700 focus:ring-2",
        "focus-visible:border-blue-500 focus-visible:ring-blue-200 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };

