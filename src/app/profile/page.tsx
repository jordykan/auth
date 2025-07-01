import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ReturnButton from "@/components/custom/return-button";
import SingOutButton from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const headerList = await headers();
  const session = await auth.api.getSession({ headers: headerList });

  if (!session) redirect("/auth/login");

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headerList,
    body: {
      userId: session.user.id,
      permission: {
        posts: ["update", "delete"],
      },
    },
  });

  const initials = session.user.name?.slice(0, 2).toUpperCase() || "US";

  return (
    <div className="min-h-screen flex flex-col space-y-5 items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold">Perfil</CardTitle>
            <div className="flex gap-2">
              {session.user.role === "ADMIN" && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/dashboard">Dashboard Admin</Link>
                </Button>
              )}
              <SingOutButton />
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback className="text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{session.user.name}</h2>
              <p className="text-sm text-muted-foreground">
                {session.user.email}
              </p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {session.user.role.toLowerCase()}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-md font-medium mb-2">Permisos</h3>
            <div className="flex gap-3 flex-wrap">
              <Button size="sm" variant="outline">
                Gestionar mis posts
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={!FULL_POST_ACCESS.success}
              >
                Gestionar todos los posts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <details className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
        <summary className="cursor-pointer">Ver sesión (debug)</summary>
        <pre className="mt-2 text-xs whitespace-pre-wrap">
          {JSON.stringify(session, null, 2)}
        </pre>
      </details>

      <ReturnButton href="/" label="Home" />
    </div>
  );
};

export default Page;
