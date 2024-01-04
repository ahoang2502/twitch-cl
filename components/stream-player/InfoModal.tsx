"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRef, ElementRef } from "react";

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

interface InfoModalProps {
	initialName: string;
	initialThumbnailUrl: string | null;
}

export const InfoModal = ({
	initialName,
	initialThumbnailUrl,
}: InfoModalProps) => {
	const closeRef = useRef<ElementRef<"button">>(null);
	const [name, setName] = useState(initialName);

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
					closeRef?.current.click();
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
