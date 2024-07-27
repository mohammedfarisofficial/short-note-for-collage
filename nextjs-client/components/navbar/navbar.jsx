"use client";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";

import { useRouter } from "next/navigation";

// auth
import NavbarItem from "./components/navbar-item";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/app/store/reducers/authSlice";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { navigation } = useSelector((state) => state.ui);
  const { setTheme } = useTheme();

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="flex px-[2rem] items-center fixed  justify-between h-[80px] w-full">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className="overflow-y-scroll" side="left">
            <SheetHeader>
              <SheetTitle>Choose your university</SheetTitle>
              <SheetDescription>Universities in kerala</SheetDescription>
              {navigation &&
                navigation.map((university, index) => (
                  <NavbarItem {...university} key={index} />
                ))}
            </SheetHeader>
            <SheetFooter>Blinko</SheetFooter>
          </SheetContent>
        </Sheet>
        <Link href="/">
          <h2 className="pl-2">blinko</h2>
        </Link>
      </div>
      <div className="flex gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {isAuthenticated ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Button onClick={() => dispatch(setLogout())}>Sign Out</Button>
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/68058442?v=4" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <>
            <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
            <Button onClick={() => router.push("/sign-up")}>Sign Up</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
