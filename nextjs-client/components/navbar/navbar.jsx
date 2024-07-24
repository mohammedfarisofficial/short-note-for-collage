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
import { signIn, signOut, useSession } from "next-auth/react";
import NavbarItem from "./components/navbar-item";

const Navbar = () => {
  const { setTheme } = useTheme();
  const router = useRouter();

  const session = useSession();
  console.log(session);

  // if (session.status === "authenticated") {
  //   console.log("session data", session);
  //   return (
  //     <>
  //       <Link href="/dashboard">dashboard</Link>
  //       <Link href="/admin-test">admin route</Link>
  //       {session?.data?.user?.name}
  //       <br />
  //       <button onClick={() => signOut()}>Sign Out</button>
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <p>Not Sign in</p>
  //     <Link href="/dashboard">dashboard</Link>
  //     <button onClick={() => router.push("/sign-up")}>Sign in</button>{" "}
  //     <button onClick={() => router.push("/sign-in")}>Sign Up</button>
  //   </>
  // );

  return (
    <div className="flex px-[2rem] items-center fixed  justify-between h-[80px] w-full">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>List of Universities</SheetTitle>
              <SheetDescription className="pt-10">
                <NavbarItem />
                <NavbarItem />
                <NavbarItem />
              </SheetDescription>
              <SheetFooter>Blinko</SheetFooter>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <h2 className="pl-2">blinko</h2>
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
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/68058442?v=4" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Button onClick={() => signOut()}>Sign Out</Button>
        <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
        <Button onClick={() => router.push("/sign-up")}>Sign Up</Button>
      </div>
    </div>
  );
};

export default Navbar;
