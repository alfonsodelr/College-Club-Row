import { SessionProvider, useSession } from 'next-auth/react'
import './styles.css'

// Use of the <SessionProvider> is now mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider
      options={{
        staleTime: 0, refetchInterval: 0
      }}
      session={session}>

      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true })
  const isUser = !!session?.user
  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

{/* <SessionProvider */ }
     // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
//StaleTime: 0
  // Stale Time controls how often the useSession in the client should
  // contact the server to sync the session state. Value in seconds.
  // e.g.
  // * 0  - Disabled (always use cache value)
  // * 60 - Sync session state with server if it's older than 60 seconds

//refetchInterval: 0
  // Refetch Interval tells windows / tabs that are signed in to keep sending
  // a keep alive request (which extends the current session expiry) to
  // prevent sessions in open windows from expiring. Value in seconds.
  //
  // Note: If a session has expired when keep alive is triggered, all open
  // windows / tabs will be updated to reflect the user is signed out.