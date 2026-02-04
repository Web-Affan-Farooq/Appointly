"use client";
import type React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      className={`cursor-pointer text-md font-semibold text-white bg-pink py-2 ${props.className}`}
    />
  );
};

export default Button;
