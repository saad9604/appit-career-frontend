import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

// Outline style button
export const OutlineButton = ({ children, className, href = "/contact" }) => {
  return (
    <Link href={href} passHref className={cn("group ", className)}>
      <Button variant="outline" size="xl" className="w-full">
        <span className="group-hover:-translate-x-1 um_transition">
          {children}
        </span>
        <ArrowRight
          className="!w-8 !h-8 group-hover:-rotate-12 transition-all ease-in-out duration-300"
          strokeWidth={1}
        />
      </Button>
    </Link>
  );
};

export const FilledButton = ({
  children,
  className,
  href = "/contact",
  asChild,
}) => {
  return (
    <Link href={href} passHref className={cn("group ", className)}>
      <Button
        size="lg"
        asChild={asChild} // ✅ Forward it here
      >
        {children}
        <ArrowRight className="!w-6 !h-6 bg-white text-primary rounded-full group-hover:text-secondary group-hover:-rotate-12 transition-all ease-in-out duration-300 group-hover:translate-x-1" />
      </Button>
    </Link>
  );
};