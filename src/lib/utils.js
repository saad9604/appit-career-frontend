import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function truncate(text, length) {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// Additional utility functions from talha-appit
export const formatAmount = (amount) => {
  if (amount == 0) {
    return "0";
  }
  return amount.toFixed(6).replace(/\.?0+$/, "");
};

export const formatNextExecutionDate = (nextExecutionDate) => {
  if (!nextExecutionDate) return "";
  const nextExecution = new Date(nextExecutionDate);
  return nextExecution.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
