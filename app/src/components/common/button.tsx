import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      className={`cursor-pointer text-md font-bold text-white bg-pink rounded-md py-1 ${props.className}`}
    />
  );
};

export default Button;
