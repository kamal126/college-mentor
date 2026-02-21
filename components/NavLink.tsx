"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({href,children}:{href:string, children:string}) {
    const pathname = usePathname();
    const isActive = pathname === href;
  return (
    <Link href={href}
    className={clsx(
        isActive? 'text-blue-500 font-semibold' : 'text-gray-500'
    )}>
        {children}
    </Link>
  )
}
