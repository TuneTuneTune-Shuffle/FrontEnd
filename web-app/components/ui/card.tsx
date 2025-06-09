// components/ui/card.tsx
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={twMerge('rounded-2xl border border-gray-800 bg-gray-900 shadow-md', className)}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: CardProps) {
  return <div className={twMerge('p-4', className)}>{children}</div>;
}