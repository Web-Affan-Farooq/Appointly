"use client";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Services",
    url: "/services",
  },
  {
    name: "About",
    url: "/about",
  },
];
const Header = () => {
  const [navStatus, setNavStatus] = useState(false);

  return (
    <header className="z-30 fixed w-full m-auto backdrop-blur-3xl bg-gray-400/30 flex flex-row flex-nowrap justify-between items-center max-sm:py-7 max-sm:px-7 sm:px-7 sm:py-7 md:px-12 md:py-7 xl:px-24 xl:py-10">
      <div className="font-bold text-xl flex flex-row flex-nowrap gap-[6px] justify-center items-center">
        {navStatus ? (
          <IconX
            className="max-sm:flex hidden z-10"
            onClick={() => setNavStatus(false)}
          />
        ) : (
          <IconMenu2
            className="max-sm:flex hidden z-10"
            onClick={() => setNavStatus(true)}
          />
        )}
        <span>Appointly</span>
      </div>

      <div className="flex flex-row flex-nowrap max-sm:hidden sm:gap-[20px] md:gap-[30px] justify-center items-center">
        {links.map((link, idx) => (
          <Link href={link.url} key={idx} className="text-md text-black">
            {link.name}
          </Link>
        ))}
        <button className="bg-pink rounded-xl px-[20px] py-[5px] ">
          Signin
        </button>
        <button className="bg-pink rounded-xl px-[20px] py-[5px] ">
          Signup
        </button>
      </div>

      <div
        className={`flex-col absolute top-0 left-0 w-full bg-black/50 backdrop-blur-300 gap-[30px] flex-nowrap hidden max-sm:flex justify-center items-center backdrop-blur-xs backdrop-grayscale py-[60px] transition-all duration-300 ease-in-out ${navStatus ? "" : "-translate-x-[100%]"}`}
      >
        {links.map((link, idx) => (
          <Link href={link.url} key={idx} className="text-md text-black">
            {link.name}
          </Link>
        ))}
        <button className="bg-pink rounded-xl px-[20px] py-[5px] ">
          Signin
        </button>
        <button className="bg-pink rounded-xl px-[20px] py-[5px] ">
          Signup
        </button>
      </div>
    </header>
  );
};
export default Header;
