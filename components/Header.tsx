import Image from "next/image";
import React from "react";
import { ToggleLight } from "./ToggleLight";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white dark:bg-black">
      <div className="flex items-center space-x-2">
        <div className="bg-red-200 w-max">
          <Image src="/open-box.png" alt="logo" width={50} height={50} />
        </div>
        <h1 className="text-2xl font-bold">Storvex</h1>
      </div>
      <div className="flex items-center gap-3 mx-6">
        <ToggleLight />
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
