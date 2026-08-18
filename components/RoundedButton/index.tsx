"use client";
import React from 'react';
import Magnetic from '../Magnetic';

interface RoundedProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Rounded({ children, onClick, className }: RoundedProps) {
  return (
    <Magnetic>
      <div className={className} onClick={onClick}>
        {children}
      </div>
    </Magnetic>
  );
}
