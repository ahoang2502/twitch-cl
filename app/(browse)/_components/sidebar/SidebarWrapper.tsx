"use client";

import React from "react";

import { useSidebar } from "@/store/useSidebar";
import { cn } from "@/lib/utils";

interface SidebarWrapperProps {
	children: React.ReactNode;
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
	const { collapsed } = useSidebar((state) => state);

	return (
		<aside
			className={cn(
				"fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50",
				collapsed && "w-[70px]"
			)}
		>
			{children}
		</aside>
	);
};

export default SidebarWrapper;
