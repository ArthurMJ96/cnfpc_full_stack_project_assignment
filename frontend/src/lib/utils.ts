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
      const value = Math.round(diffInSeconds / seconds);
      if (unit === "day" && value === -1) {
        // Special case for "yesterday" => "yesterday at HH:MM AM/PM"
        const timeStr = new Date(date).toLocaleTimeString("en", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return `yesterday at ${timeStr}`;
      }

      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        value,
        unit,
      );
    }
  }
}


export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}