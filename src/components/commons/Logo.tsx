import { PiggyBank } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo({ isMobile }: { isMobile?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      {!isMobile ? (
        <PiggyBank className="stroke h-11 w-11 stroke-lime-500 stroke-[1.5]" />
      ) : null}
      <p className="bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        Budget Tracker
      </p>
    </Link>
  );
}

export default Logo;
