"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";
import React from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { data } = useSession();
  const router = useRouter();

  const menuItems = [
    {
      href: "/dashboard",
      name: "Dashboard",
    },
    {
      href: "/movies",
      name: "Movies",
    },
  ];

  return (
    <div className="flex flex-row justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          {menuItems.map((item, index) => {
            return (
              <NavigationMenuItem key={index}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        {data?.user && (
          <div className="flex flex-row items-center gap-5">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h6>{data?.user?.name}</h6>
            <Button variant={"destructive"} onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        )}

        {!data?.user && (
          <Button variant={"default"} onClick={() => signIn()}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
