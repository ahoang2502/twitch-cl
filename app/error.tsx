"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const UserErrorPage = () => {
	return (
		<div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
			<p className="">Something went wrong! Please try again.</p>

			<Button variant="secondary" asChild>
				<Link href="/">Go back home</Link>
			</Button>
		</div>
	);
};

export default UserErrorPage;
