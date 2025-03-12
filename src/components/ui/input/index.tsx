import React from 'react';
import cn from 'classnames';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input className={cn("border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300", className)} {...props} />
  );
}
