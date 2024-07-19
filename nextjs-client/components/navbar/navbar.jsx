"use client";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
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
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";

// auth
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { setTheme } = useTheme();

  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name}
        <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return (
    <>
      Not Sign in <button onClick={() => signIn()}>Sign in </button>
    </>
  );

  // return (
  //   <div className="flex px-[2rem] items-center fixed  justify-between h-[80px] w-full">
  //     <div className="flex items-center">
  //       <Sheet>
  //         <SheetTrigger>
  //           <Menu />
  //         </SheetTrigger>
  //         <SheetContent side="left">
  //           <SheetHeader>
  //             <SheetTitle>Are you absolutely sure?</SheetTitle>
  //             <SheetDescription>
  //               This action cannot be undone. This will permanently delete your
  //               account and remove your data from our servers.
  //             </SheetDescription>
  //           </SheetHeader>
  //         </SheetContent>
  //       </Sheet>
  //       <h2 className="pl-2">blinko</h2>
  //     </div>
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="outline" size="icon">
  //           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  //           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  //           <span className="sr-only">Toggle theme</span>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end">
  //         <DropdownMenuItem onClick={() => setTheme("light")}>
  //           Light
  //         </DropdownMenuItem>
  //         <DropdownMenuItem onClick={() => setTheme("dark")}>
  //           Dark
  //         </DropdownMenuItem>
  //         <DropdownMenuItem onClick={() => setTheme("system")}>
  //           System
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   </div>
  // );
};

export default Navbar;
