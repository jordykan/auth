import {
  DeleteUserButton,
  PlaceholderDeleteUserButton,
} from "@/components/custom/delete-user-button";
import ReturnButton from "@/components/custom/return-button";
import UserRoleSelect from "@/components/custom/user-role-select";
import { UserRole } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });
  if (!session) redirect("/auth/login");
  if (session.user.role !== "ADMIN") {
    return (
      <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
        <div className="space-y-8">
          <ReturnButton href="/" label="Profile" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
            FORBIDDEN
          </p>
        </div>
      </div>
    );
  }

  const { users } = await auth.api.listUsers({
    headers: headerList,
    query: {
      sortBy: "name",
    },
  });
  const sortedUsers = users.sort((a, b) => {
    if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
    if (a.role !== "ADMIN" && b.role === "ADMIN") return -1;
    return 0;
  });
  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="space-y-8">
        <ReturnButton href="/" label="Profile" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
          ACCESS GRANTED
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table-auto min-w-full whitespace-nowrap">
          <thead>
            <tr className="border-b text-sm text-left">
              <th className="px-2 py-2"> ID</th>
              <th className="px-2 py-2"> Name</th>
              <th className="px-2 py-2"> Email</th>
              <th className="px-2 py-2"> Role</th>
              <th className="px-2 py-2"> Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} className="border-b text-sm text-left">
                <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                <td className="px-4 py-4">{user.name}</td>
                <td className="px-4 py-4">{user.email}</td>
                <td className="px-4 py-4">
                  <UserRoleSelect
                    userId={user.id}
                    role={user.role as UserRole}
                  />
                </td>
                <td className="px-4 py-4">
                  {user.role === "USER" ? (
                    <DeleteUserButton userId={user.id} />
                  ) : (
                    <PlaceholderDeleteUserButton />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
