// components/ui/button.tsx
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'link';
}

export function Button({ variant = 'default', className, ...props }: ButtonProps) {
  const base = 'px-4 py-2 font-medium rounded-2xl shadow';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    link: 'bg-transparent text-blue-400 underline hover:text-blue-600',
  };

  return (
    <button
      className={twMerge(base, variants[variant], className)}
      {...props}
    />
  );
}