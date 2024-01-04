"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTransition } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { updateStream } from "@/actions/stream";
import { UploadDropzone } from "@/lib/uploadthing";
import Hint from "../Hint";

interface InfoModalProps {
	initialName: string;
	initialThumbnailUrl: string | null;
}

export const InfoModal = ({
	initialName,
	initialThumbnailUrl,
}: InfoModalProps) => {
	const closeRef = useRef<ElementRef<"button">>(null);
	const router = useRouter();

	const [name, setName] = useState(initialName);
	const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

	const [isPending, startTransition] = useTransition();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(() => {
			updateStream({ name })
				.then(() => {
					toast.success("Stream updated");
					closeRef?.current?.click();
				})
				.catch(() => toast.error("Something went wrong! Please try again"));
		});
	};

	const onRemove = () => {
		startTransition(() => {
			updateStream({ thumbnailUrl: null })
				.then(() => {
					toast.success("Thumbnail removed!");
					setThumbnailUrl("");
					closeRef?.current?.click();
				})
				.catch(() => toast.error("Something went wrong! Please try again"));
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" size="sm" className="ml-auto">
					Edit
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit stream info</DialogTitle>
				</DialogHeader>

				<form onSubmit={onSubmit} className="space-y-14">
					<div className="space-y-2">
						<Label>Name</Label>
						<Input
							placeholder="Stream name"
							value={name}
							disabled={isPending}
							onChange={onChange}
						/>
					</div>

					<div className="space-y-2">
						<Label>Thumbnail</Label>

						{thumbnailUrl ? (
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

								<Image
									src={thumbnailUrl}
									alt="thumbnail"
									fill
									className="object-cover"
								/>
							</div>
						) : (
							<div className="rounded-xl border outline-dashed outline-muted">
								<UploadDropzone
									endpoint="thumbnailUploader"
									appearance={{
										label: {
											color: "#ffffff",
										},
										allowedContent: {
											color: "#ffffff",
										},
									}}
									onClientUploadComplete={(res) => {
										setThumbnailUrl(res?.[0]?.url);

										router.refresh();
                                        closeRef?.current?.click();
									}}
								/>
							</div>
						)}
					</div>

					<div className="flex justify-end space-x-2">
						<DialogClose ref={closeRef} asChild>
							<Button type="button" variant="outline">
								Cancel
							</Button>
						</DialogClose>

						<Button type="submit" variant="primary" disabled={isPending}>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
