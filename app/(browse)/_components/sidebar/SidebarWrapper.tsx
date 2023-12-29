"use client";

import { useIsClient } from "usehooks-ts";
import React from "react";

import { useSidebar } from "@/store/useSidebar";
import { cn } from "@/lib/utils";
import { ToggleSkeleton } from "./Toggle";
import { RecommendedSkeleton } from "./Recommended";
import { FollowingSkeleton } from "./Following";

interface SidebarWrapperProps {
	children: React.ReactNode;
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
	const isClient = useIsClient();

	const { collapsed } = useSidebar((state) => state);

	if (!isClient)
		return (
			// when server-side renders
			<aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
				<ToggleSkeleton />
				<FollowingSkeleton />
				<RecommendedSkeleton />
			</aside>
		);

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
