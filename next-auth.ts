import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { generateUsername } from "unique-username-generator";

import { db } from "./lib/db";
import authConfig from "./next-auth.config";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
} = NextAuth({
	adapter: PrismaAdapter(db),
	pages: {
		signIn: "/sign-in",
	},
	session: { strategy: "jwt" },
	events: {
		createUser: async ({ user }) => {
			const email = user.email || "";
			const username = generateUsername();

			await db.user.update({
				where: { email },
				data: {
					username,
					stream: {
						create: {
							name: `${username}'s stream`,
						},
					},
				},
			});
		},
	},
	...authConfig,
});
