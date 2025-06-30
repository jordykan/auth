"use client";

import { UserRole } from "@/generated/prisma";
import { admin } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface UserRoleSelectedProps {
  userId: string;
  role: UserRole;
}

const UserRoleSelect = ({ userId, role }: UserRoleSelectedProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleChange = async (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = evt.target.value as UserRole;
    const canChangeRole = await admin.hasPermission({
      permission: {
        user: ["set-role"],
      },
    });
    if (!canChangeRole.data?.success) {
      return toast.error("FORBIDDEN");
    }

    await admin.setRole({
      userId,
      role: newRole,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Rol actualizado");
          router.refresh();
        },
      },
    });
  };
  return (
    <div className="">
      <select
        name=""
        id=""
        value={role}
        onChange={handleChange}
        disabled={role === "ADMIN" || isPending}
        className="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="ADMIN">ADMIN</option>
        <option value="USER">USER</option>
      </select>
    </div>
  );
};

export default UserRoleSelect;
