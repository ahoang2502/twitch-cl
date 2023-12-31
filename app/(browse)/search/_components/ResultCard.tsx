import { Stream, User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";

import { Thumbnail, ThumbnailSkeleton } from "@/components/Thumbnail";
import { VerifyMark } from "@/components/VerifyMark";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {
	data: {
		id: string;
		name: string;
		thumbnailUrl: string | null;
		isLive: boolean;
		updatedAt: Date;
		user: User;
	};
}

export const ResultCard = ({ data }: ResultCardProps) => {
	return (
		<Link href={`/${data.user.username}`}>
			<div className="w-full flex gap-x-4">
				<div className="relative h-[9rem] w-[16rem]">
					<Thumbnail
						src={data.thumbnailUrl}
						fallback={data.user.image!}
						isLive={data.isLive}
						username={data.user.username!}
					/>
				</div>

				<div className="space-y-1 ">
					<div className="flex items-center gap-x-2 ">
						<p className="font-bold text-lg cursor-pointer hover:text-purple-500">
							{data.user.username}
						</p>
						<VerifyMark />
					</div>

					<p className="text-sm text-muted-foreground">{data.name}</p>
					<p className="text-sm text-muted-foreground">
						{formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}
					</p>
				</div>
			</div>
		</Link>
	);
};

export const ResultCardSkeleton = () => (
	<div className="w-full flex gap-x-4 ">
		<div className="relative h-[9rem] w-[16rem]">
			<ThumbnailSkeleton />
		</div>
		<div className="space-y-2 ">
			<Skeleton className="w-32 h-4" />
			<Skeleton className="w-24 h-3" />
			<Skeleton className="w-12 h-3" />
		</div>
	</div>
);
