import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRelativeTime(date: number) {
  const now = new Date().getTime() as number;
  const diffInSeconds = Math.round((date - now) / 1000);

  // Logic to determine unit
  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    if (Math.abs(diffInSeconds) >= seconds || unit === "second") {
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        Math.round(diffInSeconds / seconds),
        unit,
      );
    }
  }
}
