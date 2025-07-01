import {
  DeleteUserButton,
  PlaceholderDeleteUserButton,
} from "@/components/custom/delete-user-button";
import ReturnButton from "@/components/custom/return-button";
import UserRoleSelect from "@/components/custom/user-role-select";
import { UserRole } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = async () => {
  const headerList = await headers();
  const session = await auth.api.getSession({ headers: headerList });

  if (!session) redirect("/auth/login");

  if (session.user.role !== "ADMIN") {
    return (
      <div className="container max-w-2xl mx-auto py-16 px-4 space-y-6">
        <ReturnButton href="/" label="Profile" />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="p-3 rounded-md bg-destructive text-white text-center font-semibold">
              FORBIDDEN
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { users } = await auth.api.listUsers({
    headers: headerList,
    query: { sortBy: "name" },
  });

  const sortedUsers = users.sort((a, b) => {
    if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
    if (a.role !== "ADMIN" && b.role === "ADMIN") return 1;
    return 0;
  });

  return (
    <div className="container max-w-5xl mx-auto py-16 px-4 space-y-6">
      <ReturnButton href="/profile" label="Perfil" />

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">
              Admin Dashboard
            </CardTitle>
            <p className="text-sm text-muted-foreground">Gestión de usuarios</p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1 font-medium">
            Access Granted
          </Badge>
        </CardHeader>

        <CardContent>
          <ScrollArea className="w-full max-h-[600px] overflow-auto">
            <table className="w-full text-sm table-auto border-collapse">
              <thead>
                <tr className="border-b bg-muted text-muted-foreground text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Correo</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/30">
                    <td className="px-4 py-3">{user.id.slice(0, 8)}</td>
                    <td className="px-4 py-3 font-medium">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <UserRoleSelect
                        userId={user.id}
                        role={user.role as UserRole}
                      />
                    </td>
                    <td className="px-4 py-3">
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
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
