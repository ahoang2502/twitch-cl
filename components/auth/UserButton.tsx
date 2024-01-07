import { LogOut } from "lucide-react";

import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { UserAvatar } from "../UserAvatar";
import { getSelf } from "@/lib/auth-service";
import { signOut } from "@/next-auth";
import { SettingsModal } from "./SettingsModal";
import { currentUser } from "@/lib/auth";

export const UserButton = async ({ props }: any) => {
	const user = await getSelf();
	if (!user) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar username={user.username!} imageUrl={user.image!} />
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-60">
				<DropdownMenuLabel>{user.username}</DropdownMenuLabel>

				<SettingsModal
					initialImage={user.image!}
					initialUsername={user.username}
				/>

				<DropdownMenuSeparator />
				<form
					action={async () => {
						"use server";

						await signOut();
					}}
				>
					<Button variant="ghost" size="sm" className="w-full justify-start">
						<LogOut className="h-4 w-4 mr-2" />
						Logout
					</Button>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
