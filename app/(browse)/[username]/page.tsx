import React from "react";
import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "./_components/Actions";

interface UserPageProps {
	params: {
		username: string;
	};
}

const UserPage = async ({ params }: UserPageProps) => {
	const user = await getUserByUsername(params.username);

	if (!user) notFound();

	const isFollowing = await isFollowingUser(user.id);

	return (
		<div className="">
			<Actions isFollowing={isFollowing} userId={user.id} />
		</div>
	);
};

export default UserPage;
