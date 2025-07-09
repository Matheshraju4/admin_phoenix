"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Phone,
  MessageCircle,
  User,
  Menu,
  X,
  ChevronDown,
  Home,
  Package,
  FileText,
  Download,
  Heart,
  ScanBarcode,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function Navbar({ trigger }: { trigger: React.ReactNode }) {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            {trigger}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                width={1000}
                height={1000}
                className="w-auto h-10 transition-transform hover:scale-105"
                alt="Phoenix Diagnostics"
              />
            </Link>

            {/* Desktop Navigation */}
          </div>

          {/* Mobile menu button */}

          {/* Search and Contact (Desktop) */}
        </div>
      </div>

      {/* Mobile search bar - conditionally rendered */}

      {/* Mobile menu - slide from right */}
    </nav>
  );
}
