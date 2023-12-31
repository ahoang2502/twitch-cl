"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { updateStream } from "@/actions/stream";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
	field: FieldTypes;
	label: string;
	value: boolean;
}

export const ToggleCard = ({
	field,
	label,
	value = false,
}: ToggleCardProps) => {
	const [isPending, startTransition] = useTransition();

	const onChange = async () => {
		startTransition(() => {
			updateStream({ [field]: !value })
				.then(() => toast.success("Chat settings updated!"))
				.catch(() =>
					toast.error("Something went wrong. Please try again later!")
				);
		});
	};

	return (
		<div className="rounded-xl bg-muted p-6">
			<div className="flex items-center justify-between">
				<p className="font-semibold shrink-0">{label}</p>

				<div className="space-y-2">
					<Switch
						checked={value}
						onCheckedChange={onChange}
						disabled={isPending}
					>
						{value ? "On" : "Off"}
					</Switch>
				</div>
			</div>
		</div>
	);
};

export const ToggleCardSkeleton = () => (
	<Skeleton className="rounded-xl w-full p-10" />
);
