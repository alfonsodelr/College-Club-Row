import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;
import { getUserProfile, userType } from "../../../utils/helper"
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  //`The session object is not persisted server side`, but you can use accessToken to get around this. raed more on documentation
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  // When using JSON Web Tokens the jwt() callback is invoked before the session() callback,
  //              so anything you add to the JSON Web Token will be immediately available in 
  //              the session callback, like for example an access_token from a provider.
  jwt: {
    secret: process.env.SECRET   //default
    //realated reading: https://next-auth.js.org/configuration/options#jwt
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour of encrypted (JWE). We recommend you keep this behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },

    //   //read more on: https://next-auth.js.org/configuration/callbacks#jwt-callback
    //   // The arguments user, account, profile and isNewUser are only passed the first time 
    //   //            this callback is called on a new session, after the user signs in. In 
    //   //            subsequent calls, only token will be available.
    //   //create custom session object reading: 
    //   //            https://vizzuality.github.io/devismos/docs/researches/next-auth/#solution
    async jwt({ token }) {
      try {
        if (!token.profiles) {
          var res = await getUserProfile({ userID: token.sub, email: token.email, legalName: token.name })
          if (res.status !== 200) throw new Error(`[nextAuth] callbacks.jwt: getUserProfiles has status code: ${res.status}`);
          var profiles: any = res.data;
          token.profiles = unmarshall(profiles);
        }
        // console.log(token)
        //@DocumentID=12
        return token
      } catch (error) {
        console.log(error)
        return token;
      }
    },
    async session({ session, token }) {

      let tokens: any = token; //!!!!! fix 'any'
      session.userID = tokens.profiles.userID;
      return session
    }
  },


  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: "light",
  },
  // Enable debug messages in the console if you are having problems
  debug: false,

})

export { }




        //     // //logging jwt params for development: 
        //     // console.log(`token: ${JSON.stringify(token)} ,\n user: ${JSON.stringify(user)},\
        //     //   \n account: ${JSON.stringify(account)} \n profile: ${JSON.stringify(profile)}\n isNewUSer: \
        //     //    ${JSON.stringify(isNewUser)}\n session: ${JSON.stringify(session)} \n`)
        //     // console.log("token from [nextAuth] is: ", token);



/*
//--------------GoogleProvider JWT Callback(callbacks.jwt) first time response-----------------------
//funciton signature: async jwt({ token, user, account, profile, isNewUser, session }) =>{}
//note: after the first time call back, all params except token is undefined.
{
  token: {
    "name": "",
    "email": "",
    "picture": "",
    "sub": ""
  },
  user: {
    "id": "",
    "name": "",
    "email": "",
    "image": ""
  },
  account: {
    "provider": "google",
    "type": "oauth",
    "providerAccountId": "",
    "access_token": "",
    "expires_at": 1643149120,
    "scope": "",
    "token_type": "Bearer",
    "id_token": ""
  },
  profile: {
    "iss": "https://accounts.google.com",
    "azp": "",
    "aud": "",
    "sub": "",
    "email": "",
    "email_verified": true,
    "at_hash": "",
    "name": "",
    "picture": "",
    "given_name": "",
    "family_name": "",
    "locale": "en",
    "iat": 1643145521,
    "exp": 1643149121
  },
  isNewUSer: undefined,
  session: undefined
}


@DocumentID=12
------------sample JWT token with user profile-----------------------
{
  name: 'ABUDIKERANMU YASEN',
  email: 'yasen_abudikeranmu@student.smc.edu',
  picture: 'https://lh3.googleusercontent.com/a-/AOh14GgihV6IVsTqVrs7dWV9sxBj3g2PgehCudZxzQ3c=s96-c',
  sub: '104142427804075574374',
  iat: 1643595705,
  exp: 1646187705,
  jti: '28a63e79-035a-455d-ad30-5c9a67a04879',
  profiles: {
    role: '["member"]',
    clubs: '[]',
    userID: '104142427804075574374',
    userName: 'ABUDIKERANMU YASEN',
    tasks: '[]',
    email: '"yasen_abudikeranmu@student.smc.edu"',
    legalName: 'ABUDIKERANMU YASEN'
  }
}

*/