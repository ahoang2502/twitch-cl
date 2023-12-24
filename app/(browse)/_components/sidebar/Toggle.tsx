"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/useSidebar";

const Toggle = () => {
	const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

	const label = collapsed ? "Expand" : "Collapse";

	return (
		<>
			{collapsed && (
				<div className="hidden lg:flex w-full items-center justify-center p-4 mb-4">
					<Hint label={label} side="right" asChild>
						<Button className="h-auto p-2" variant="ghost" onClick={onExpand}>
							<ArrowRightFromLine className="w-4 h-4" />
						</Button>
					</Hint>
				</div>
			)}
			{!collapsed && (
				<div className="p-3 pl-6 mb-2 flex items-center w-full">
					<p className="font-semibold text-primary">For you</p>

					<Hint label={label} side="right" asChild>
						<Button
							className="h-auto p-2 ml-auto "
							variant="ghost"
							onClick={onCollapse}
						>
							<ArrowLeftFromLine className="w-4 h-4" />
						</Button>
					</Hint>
				</div>
			)}
		</>
	);
};

export default Toggle;
