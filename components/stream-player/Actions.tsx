"use client";

import { useAuth } from "@/lib/auth";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
	isFollowing: boolean;
	isHost: boolean;
	hostIdentity: string;
}

export const Actions = ({
	isFollowing,
	isHost,
	hostIdentity,
}: ActionsProps) => {
	const { userId } = useAuth();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(hostIdentity)
				.then((data) =>
					toast.success(`You are now following ${data.following.username}`)
				)
				.catch(() => toast.error("Something went wrong! Please try again."));
		});
	};

	const handleUnfollow = () => {
		startTransition(() => {
			onUnfollow(hostIdentity)
				.then((data) =>
					toast.success(`You have unfollowed ${data.following.username}`)
				)
				.catch(() => toast.error("Something went wrong! Please try again."));
		});
	};

	const toggleFollow = () => {
		if (!userId) return router.push("/sign-in");

		if (isHost) return;

		if (isFollowing) {
			handleUnfollow();
		} else {
			handleFollow();
		}
	};

	return (
		<Button
			onClick={toggleFollow}
			variant="primary"
			size="sm"
			className="w-full lg:w-auto"
			disabled={isPending || isHost}
		>
			<Heart
				className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
			/>

			{isFollowing ? "Unfollow" : "Follow"}
		</Button>
	);
};

export const ActionsSkeleton = () => (
	<Skeleton className="h-10 w-full lg:w-24" />
);
