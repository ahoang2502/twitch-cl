"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import { UnblockButton } from "./UnblockButton";

export type BlockedUser = {
	id: string;
	userId: string;
	imageUrl: string | null;
	username: string | null;
	createdAt: string;
};

export const columns: ColumnDef<BlockedUser>[] = [
	{
		accessorKey: "username",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Username
				<ArrowUpDown className="h-4 w-4 ml-2" />
			</Button>
		),
		cell: ({ row }) => (
			<div className="flex items-center gap-x-4">
				<UserAvatar
					username={row.original.username!}
					imageUrl={row.original.imageUrl!}
				/>

				<span>{row.original.username}</span>
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Date blocked
				<ArrowUpDown className="h-4 w-4 ml-2" />
			</Button>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
	},
];
