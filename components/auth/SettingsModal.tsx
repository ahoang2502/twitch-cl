"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Settings, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { updateUser } from "@/actions/user";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import Hint from "../Hint";
import { UploadDropzone } from "@/lib/uploadthing";

interface SettingsProps {
	initialUsername: string | null;
	initialImage: string | null;
}

export const SettingsModal = ({
	initialImage,
	initialUsername,
}: SettingsProps) => {
	const [username, setUsername] = useState(initialUsername || "");
	const [image, setImage] = useState(initialImage || "");

	const closeRef = useRef<ElementRef<"button">>(null);
	const router = useRouter();

	const [isPending, startTransition] = useTransition();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(() => {
			updateUser({ username: username })
				.then(() => {
					toast.success("Username updated!");
					closeRef?.current?.click();
				})
				.catch(() => toast.error("Something went wrong! Please try again."));
		});
	};

	const onRemove = () => {
		startTransition(() => {
			updateUser({ image: null })
				.then(() => {
					setImage("");
					toast.success("Image removed.");

					closeRef?.current?.click();
				})
				.catch(() =>
					toast.error("Something went wrong! Please try again later.")
				);
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" size="sm" className="w-full justify-start">
					<Settings className="h-4 w-4 mr-2" />
					Settings
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit user settings</DialogTitle>
				</DialogHeader>

				<form onSubmit={onSubmit} className="space-y-4">
					<Input
						placeholder="Username"
						onChange={(event) => {
							setUsername(event.target.value);
						}}
						value={username}
						disabled={isPending}
					/>

					{image ? (
						<div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
							<div className="absolute top-2 right-2 z-[10]">
								<Hint label="Remove thumbnail" asChild side="left">
									<Button
										type="button"
										disabled={isPending}
										onClick={onRemove}
										className="h-auto w-auto p-1.5"
									>
										<Trash className="h-4 w-4" />
									</Button>
								</Hint>
							</div>

							<Image src={image} alt="image" fill className="object-cover" />
						</div>
					) : (
						<div className="rounded-xl border outline-dashed outline-muted">
							<UploadDropzone
								endpoint="imageUploader"
								appearance={{
									label: {
										color: "#ffffff",
									},
									allowedContent: {
										color: "#ffffff",
									},
								}}
								onClientUploadComplete={(res) => {
									setImage(res?.[0]?.url);

									router.refresh();
									closeRef?.current?.click();
								}}
							/>
						</div>
					)}

					<div className="flex justify-end space-x-2 ">
						<DialogClose asChild ref={closeRef}>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</DialogClose>

						<Button variant="primary" disabled={isPending} type="submit">
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
