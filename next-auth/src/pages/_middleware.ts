import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {

  try {
    console.log("index middleWare index is running")

    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie:
        process.env.NEXTAUTH_URL?.startsWith("https://") ??
        !!process.env.VERCEL_URL,
    })

    // console.log(session)

    if (req.nextUrl.pathname === "/middleware-protected") {
      const session = await getToken({
        req,
        secret: process.env.SECRET,
        secureCookie:
          process.env.NEXTAUTH_URL?.startsWith("https://") ??
          !!process.env.VERCEL_URL,
      })

      // console.log(session)
      // console.log("this session is", session, "session.....")
      // You could also check for any property on the session object,
      // like role === "admin" or name === "John Doe", etc.
      if (!session) return NextResponse.redirect("/api/auth/signin")
      // If user is authenticated, continue.
    }
  } catch (error) {
    console.log("/_middleware: " + error.message)
  }
}

