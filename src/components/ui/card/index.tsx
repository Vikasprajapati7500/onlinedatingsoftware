import React from 'react';
import cn from 'classnames';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={cn("bg-white rounded shadow p-4", className)} {...props} />;
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn("border-b pb-2 mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: CardProps) {
  return <h2 className={cn("text-xl font-bold", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-2", className)} {...props} />;
}
