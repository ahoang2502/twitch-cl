import React from "react";

import { SidebarWrapper } from "./SidebarWrapper";
import { Toggle } from "./Toggle";
import { Navigation } from "./Navigation";

export const Sidebar = () => {
	return (
		<SidebarWrapper>
			<Toggle />
			<Navigation />
		</SidebarWrapper>
	);
};
