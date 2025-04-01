import { getSession } from "next-auth/react";

export async function middleware(req) {
    const session = await getSession({ req });
    if (!session && req.nextUrl.pathname !== "/login") {
        return Response.redirect(new URL("/login", req.url));
    }
}
