'use client';

import { routing, Locale } from "@/i18n/routing";
import { useParams } from "next/navigation";

export function formatDate(date: string, includeRelative = false) {
    const params = useParams();

    // Ensure locale is a string, not an array, and fallback to defaultLocale
    const currentLocale: Locale = Array.isArray(params?.locale) 
        ? params.locale[0] 
        : (params?.locale as Locale) || routing.defaultLocale;

    const currentDate = new Date();

    if (!date.includes('T')) {
        date = `${date}T00:00:00`;
    }

    const targetDate = new Date(date);
    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    const daysAgo = currentDate.getDate() - targetDate.getDate();

    let formattedDate = '';

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d ago`;
    } else {
        formattedDate = 'Today';
    }

    const fullDate = targetDate.toLocaleString(currentLocale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    if (!includeRelative) {
        return fullDate;
    }

    return `${fullDate} (${formattedDate})`;
}