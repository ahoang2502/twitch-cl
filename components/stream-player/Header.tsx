"use client";

import {
	useParticipants,
	useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";

import { UserAvatar, UserAvatarSkeleton } from "../UserAvatar";
import { VerifyMark } from "../VerifyMark";
import { Actions, ActionsSkeleton } from "./Actions";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
	hostName: string;
	hostIdentity: string;
	viewerIdentity: string;
	imageUrl: string;
	isFollowing: boolean;
	name: string;
}

export const Header = ({
	hostIdentity,
	hostName,
	viewerIdentity,
	imageUrl,
	isFollowing,
	name,
}: HeaderProps) => {
	const participants = useParticipants();
	const participant = useRemoteParticipant(hostIdentity);

	const isLive = !!participant;
	const participantCount = participants.length - 1;

	const hostAsViewer = `host-${hostIdentity}`;
	const isHost = viewerIdentity === hostAsViewer;

	return (
		<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0  items-start justify-between px-4">
			<div className="flex items-center gap-x-3">
				<UserAvatar
					imageUrl={imageUrl}
					username={hostName}
					size="lg"
					isLive={isLive}
					showBadge
				/>

				<div className="space-y-1">
					<div className="flex items-center gap-x-2">
						<h2 className="text-lg font-semibold">{hostName}</h2>
						<VerifyMark />
					</div>

					<p className="text-sm font-semibold">{name}</p>

					{isLive ? (
						<div className="font-semibold flex items-center text-xs text-rose-500 gap-x-1">
							<UserIcon className="h-4 w-4" />
							<p className="">
								{participantCount}{" "}
								{participantCount === 1 ? "viewer" : "viewers"}
							</p>
						</div>
					) : (
						<p className="font-semibold text-xs text-muted-foreground">
							Offline
						</p>
					)}
				</div>
			</div>

			<Actions
				isFollowing={isFollowing}
				hostIdentity={hostIdentity}
				isHost={isHost}
			/>
		</div>
	);
};

export const HeaderSkeleton = () => (
	<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0  items-start justify-between px-4">
		<div className="flex items-center gap-x-2">
			<UserAvatarSkeleton size="lg" />

			<div className="space-y-2">
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-4 w-24" />
			</div>
		</div>

		<ActionsSkeleton />
	</div>
);
