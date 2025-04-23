"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/nav/mode-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

export default function TopNav() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="top-nav flex justify-between items-center px-4 py-2 shadow-sm bg-white dark:bg-background sticky top-0 z-50">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center space-x-2 hover:opacity-80 transition"
      >
        <Image src="/logo.svg" alt="logo" width={40} height={40} priority />
        <span className="hidden sm:block font-semibold text-lg text-foreground">
          Resume Builder
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {isSignedIn && (
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {user?.fullName}'s Dashboard
          </Link>
        )}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <ModeToggle />
      </div>

      {/* Toast notifications */}
      <Toaster position="top-center" />
    </nav>
  );
}
