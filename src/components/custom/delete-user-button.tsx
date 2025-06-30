"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteUserAction } from "@/actions/delete-user-actions";
import { toast } from "sonner";

interface DelteUserButtonProps {
  userId: string;
}

export const DeleteUserButton = ({ userId }: DelteUserButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const handleClick = async () => {
    setIsPending(true);
    const { error } = await deleteUserAction({ userId });
    if (error) {
      toast.error(error);
    } else {
      toast.success("Usuario eliminado");
    }
  };
  return (
    <Button
      className="size-7 rounded-sm"
      variant="destructive"
      size="icon"
      disabled={isPending}
      onClick={handleClick}
    >
      <span className="sr-only">Delete user</span>
      <Trash2Icon />
    </Button>
  );
};

export const PlaceholderDeleteUserButton = () => {
  const [isPending, setIsPending] = useState(false);
  return (
    <Button
      className="size-7 rounded-sm"
      variant="destructive"
      size="icon"
      disabled
    >
      <span className="sr-only">Delete user</span>
      <Trash2Icon />
    </Button>
  );
};
