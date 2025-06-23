"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

// Set up a patch for React 18/19 compatibility
if (typeof window !== 'undefined') {
  const originalCreateElement = React.createElement;
  
  // This patch helps with "Cannot add property current, object is not extensible" errors
  React.createElement = function(type, props, ...children) {
    if (props && props.ref && typeof props.ref === 'object' && Object.isExtensible && !Object.isExtensible(props.ref)) {
      // Create a new extensible ref object
      const newRef = { current: props.ref.current };
      props = { ...props, ref: newRef };
    }
    return originalCreateElement(type, props, ...children);
  };
}

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center bg-card justify-center rounded-lg p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex bg-card items-center data-[state=active]:text-white rounded-3xl justify-between whitespace-nowrap p-4 text-xl font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };