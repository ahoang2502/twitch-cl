import React from "react";
import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "./_components/Actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
	params: {
		username: string;
	};
}

const UserPage = async ({ params }: UserPageProps) => {
	const user = await getUserByUsername(params.username);

	if (!user) notFound();

	const isFollowing = await isFollowingUser(user.id);
	const isBlocked = await isBlockedByUser(user.id);

	if (isBlocked) notFound();

	return (
		<div className="">
			<Actions isFollowing={isFollowing} userId={user.id} />

			<p>isblocked: {`${isBlocked}`}</p>
		</div>
	);
};

export default UserPage;
