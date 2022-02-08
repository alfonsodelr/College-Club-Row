//Purpose of middleware: how you manipulate and configure a response, based on the incoming requests.

import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { getClubName, getClubRoleFromSession } from "../../utils/helper"
import { sessionType } from "../../utils/schema"
/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
    try {
        if (req.nextUrl.pathname !== "/club") return NextResponse.next();
        console.log("club middleWare is running")

        var session: any = await getToken({
            req,
            secret: process.env.SECRET,
            secureCookie:
                process.env.NEXTAUTH_URL?.startsWith("https://") ??
                !!process.env.VERCEL_URL,
        })

        if (!session) return NextResponse.redirect("/api/auth/signin")

        var roleArr = session.profiles.role;
        const { role, numOfRole } = getClubRoleFromSession(roleArr)

        if (numOfRole === 0) return NextResponse.redirect("/");

        if (numOfRole > 1) {
            //have to fix this seanrio later!!!!!
            //warning more than one role
        }

        var userRole = role[0][0];
        var userClub = role[0][1];
        var clubName = getClubName(parseInt(userClub));
        return NextResponse.redirect(`/club/${clubName}`)

    } catch (error) {
        console.log("club/_middleware: ", error.message)
    }
}
