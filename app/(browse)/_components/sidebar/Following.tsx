"use client";

import { useSidebar } from "@/store/useSidebar";
import { Follow, Stream, User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./UserItem";

interface FollowingProps {
	data: (Follow & {
		following: User & {
			stream: { isLive: boolean } | null;
		};
	})[];
}

export const Following = ({ data }: FollowingProps) => {
	const { collapsed } = useSidebar((state) => state);

	if (!data.length) return null;

	return (
		<div className="">
			{!collapsed && (
				<div className="pl-6 mb-4">
					<p className="text-sm text-muted-foreground">Following</p>
				</div>
			)}

			<ul className="space-y-2 px-2 ">
				{data.map((follow) => (
					<UserItem
						key={follow.following.id}
						username={follow.following.username!}
						imageUrl={follow.following.image!}
						isLive={follow.following.stream?.isLive}
					/>
				))}
			</ul>
		</div>
	);
};

export const FollowingSkeleton = () => (
	<ul className="px-2 pt-2 lg:pt-0">
		{[...Array(3)].map((_, i) => (
			<UserItemSkeleton key={i} />
		))}
	</ul>
);
