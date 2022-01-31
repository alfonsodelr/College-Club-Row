
// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { userType } from "../../utils/helper"
const secret = process.env.SECRET

export default async function middleware(req, res) {
    const token: any = await getToken({ req, secret })
    const role = token.profiles.role;
    if (!token || !role.includes("president") || !role.includes("officer")) return NextResponse.redirect("/unauth")

    // console.log("JSON Web Token", JSON.stringify(token, null, 2))
    console.log("club middleware is running")
    return NextResponse.next()

}