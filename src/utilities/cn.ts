import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with clsx and resolve Tailwind class conflicts with
 * tailwind-merge. Local replacement for @ably/ui/core/utils/cn (DX-1128).
 */
const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export default cn;
