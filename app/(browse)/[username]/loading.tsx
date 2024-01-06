import { StreamPlayerSkeleton } from "@/components/stream-player";
import React from "react";

const UserLoadingPage = () => {
	return (
		<div className="h-full ">
			<StreamPlayerSkeleton />
		</div>
	);
};

export default UserLoadingPage;
