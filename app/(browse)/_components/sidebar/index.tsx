import React from "react";

import SidebarWrapper from "./SidebarWrapper";
import Toggle from "./Toggle";
import Recommended, { RecommendedSkeleton } from "./Recommended";
import { getRecommended } from "@/lib/recommended-service";

const Sidebar = async () => {
	const recommended = await getRecommended();

	return (
		<SidebarWrapper>
			<Toggle />

			<div className="space-y-4 pt-4 lg:pt-0">
				<Recommended data={recommended} />
			</div>
		</SidebarWrapper>
	);
};

export const SidebarSkeleton = () => {
	return (
		<aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
			<RecommendedSkeleton />
		</aside>
	);
};

export default Sidebar;
