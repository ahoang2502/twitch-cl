import React from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

interface HintProps {
	children: React.ReactNode;
	label: string;
	asChild?: boolean;
	side?: "top" | "bottom" | "left" | "right";
	align?: "start" | "center" | "end";
}

const Hint = ({ children, label, asChild, side, align }: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>

				<TooltipContent
					className="text-black bg-white "
					side={side}
					align={align}
				>
					<p className="font-medium text-xs ">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default Hint;
