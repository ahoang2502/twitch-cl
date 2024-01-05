"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

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
import { Textarea } from "../ui/textarea";

interface BioProps {
	initialValue: string | null;
}

export const BioModal = ({ initialValue }: BioProps) => {
	const [value, setValue] = useState(initialValue || "");

	const closeRef = useRef<ElementRef<"button">>(null);

	const [isPending, startTransition] = useTransition();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(() => {
			updateUser({ bio: value })
				.then(() => {
					toast.success("User bio updated!");
					closeRef?.current?.click();
				})
				.catch(() => toast.error("Something went wrong! Please try again."));
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
					<DialogTitle>Edit user bio</DialogTitle>
				</DialogHeader>

				<form onSubmit={onSubmit} className="space-y-4">
					<Textarea
						placeholder="User bio"
						onChange={(event) => {
							setValue(event.target.value);
						}}
						value={value}
						disabled={isPending}
						className="resize-none"
					/>

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
