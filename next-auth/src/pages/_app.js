import { SessionProvider, useSession } from 'next-auth/react'
import '../styles/globals.css'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//------MUI THEME-----------
const themeOptions = {
  palette: {
    primary: {
      main: '#673ab7',
      light: '#9a67ea',
      dark: '#320b86',
    },
    secondary: {
      main: '#2196f3',
      light: '#6ec6ff',
      dark: '#0069c0',
    },
  },
};
const customTheme = createTheme(themeOptions);



// Use of the <SessionProvider> is now mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider options={{ staleTime: 0, refetchInterval: 0 }} session={session}>
      <CssBaseline />


      <ThemeProvider theme={customTheme}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
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