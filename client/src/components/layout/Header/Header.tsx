"use client";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pagesNotAllowed } from "@/shared/constants";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import type { InferSelectModel } from "drizzle-orm";
import type { user } from "@/db/schemas";

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

type ProfileData = InferSelectModel<typeof user> & {
  image: string | null | undefined;
};


const Header = () => {
  const [navStatus, setNavStatus] = useState(false);
  const pathname = usePathname();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await authClient.getSession();
      if (data?.user) {
        setProfileData(data.user as ProfileData);
      }
    };

    checkAuth();
    console.log()
  }, []);

  const isUser = !!profileData;

  if (pagesNotAllowed.includes(pathname)) {
    return null;
  }

  return (
    <header className="z-30 fixed w-full m-auto backdrop-blur-3xl bg-gray-400/30 flex flex-row flex-nowrap justify-between items-center max-sm:p-7 sm:p-7 md:px-12 md:py-6 xl:px-24 2xl:py-10">
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

      {/* Desktop Navigation */}
      <div className="flex flex-row flex-nowrap max-sm:hidden sm:gap-[20px] md:gap-[30px] justify-center items-center">
        {links.map((link) => (
          <Link href={link.url} key={link.name} className="text-md text-black">
            {link.name}
          </Link>
        ))}

        {isUser ? (
          <Link
            href={
              profileData.role.toLowerCase() === "provider"
                ? "/dashboard"
                : "/account"
            }
          >
            <div className="cursor-pointer flex justify-center items-center gap-[10px]">
              {profileData?.image ? (
                <Image
                  src={profileData.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-pink flex items-center justify-center text-white">
                  {profileData?.name?.[0] || profileData?.email?.[0] || "U"}
                </div>
              )}
              <span className="text-sm">
                {profileData?.name || profileData?.email}
              </span>
            </div>
          </Link>
        ) : (
          <>
            <Link
              href={"/login-user"}
              className="bg-pink rounded-xl px-[20px] py-[5px] cursor-pointer"
            >
              Signin
            </Link>
            <Link
              href={"/signup-user"}
              className="bg-pink rounded-xl px-[20px] py-[5px] cursor-pointer"
            >
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div
        className={`flex-col absolute top-0 left-0 w-full bg-black/50 backdrop-blur-300 gap-[30px] flex-nowrap flex sm:hidden justify-center items-center backdrop-blur-xs backdrop-grayscale py-[60px] transition-all duration-300 ease-in-out ${navStatus ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.name}
            className="text-md text-white"
            onClick={() => setNavStatus(false)}
          >
            {link.name}
          </Link>
        ))}

        {isUser ? (
          <div className="cursor-pointer flex flex-col items-center gap-2">
            {profileData?.image ? (
              <Image
                src={profileData.image}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-pink flex items-center justify-center text-white text-xl">
                {profileData?.name?.[0] || profileData?.email?.[0] || "U"}
              </div>
            )}
            <span className="text-white">
              {profileData?.name || profileData?.email}
            </span>
          </div>
        ) : (
          <>
            <Link
              href={"/login-user"}
              className="bg-pink rounded-xl px-[20px] py-[5px] cursor-pointer text-white"
              onClick={() => setNavStatus(false)}
            >
              Signin
            </Link>
            <Link
              href={"/signup-user"}
              className="bg-pink rounded-xl px-[20px] py-[5px] cursor-pointer text-white"
              onClick={() => setNavStatus(false)}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
