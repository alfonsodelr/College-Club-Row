
// // This is an example of how to read a JSON Web Token from an API route
// import axios from "axios"
// import { NextResponse } from "next/server"
// /*----TODO----
// 1.  

// */

// export default async function middleware(req, res) {
//     // console.log("club Middleware is running", req.cookies)
//     // console.log("club Middleware is running", baseUrl)
//     // const clubResponse = await axios.get(baseUrl + "/api/club/", { params: { clubID: "111" } })
//     // console.log(clubResponse);

//     ///------temparary disabling this for testing
//     // const token: any = await getToken({ req, secret })
//     // const role = token.profiles.role;
//     // if (!token || !role.includes("president") || !role.includes("officer")) return NextResponse.redirect("/unauth")

//     // // console.log("JSON Web Token", JSON.stringify(token, null, 2))
//     // console.log("club middleware is running")


//     return NextResponse.next()

// }

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
