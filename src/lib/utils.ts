import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUsernameFromEmail(email: string) {
  return email.split("@")[0];
}

export function getImageUrl(image: string | null | undefined) {
  if (!image) return "/user_profile.svg";
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("/")
  ) {
    return image;
  }
  return `https://79gcelddzk.ucarecd.net/${image}/`;
}