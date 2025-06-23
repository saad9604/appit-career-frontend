import * as React from "react";
import { cn } from "../../lib/utils";

function Input({ className, type, value, onChange, ...props }) {
  const handleChange = (e) => {
    let newValue = e.target.value;

    // Ensure the value is a valid number
    if (newValue && !isNaN(parseFloat(newValue))) {
      // Restrict input to a minimum value of 0.00001
      if (parseFloat(newValue) < 0.00001) {
        newValue = "0.00001";
      }
    }

    // Update the value via onChange with the adjusted newValue
    onChange?.(e);
  };

  return (
    <input
      type={type}
      value={value || ""} // Ensure the value is controlled, fallback to an empty string if undefined
      onChange={handleChange} // Use the modified change handler
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-12 w-full min-w-0 bg-card px-3 pl-12 py-1 border-2 rounded-full text-sm xl:text-base 3xl:text-lg transition-[color,box-shadow] shadow-sm outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:rounded-full focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
