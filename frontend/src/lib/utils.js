/**
 * utils.js
 * Utility helpers used by shadcn-style UI components.
 * cn() merges class names, resolving Tailwind conflicts.
 */

// Minimal clsx-style class merger (no external deps needed beyond what's already installed)
export function cn(...classes) {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ');
}
