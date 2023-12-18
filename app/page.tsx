import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<div className="flex flexc-ol gap-y-4">
			<h1>Dashboard</h1>
			<UserButton afterSignOutUrl="/" />
		</div>
	);
}
