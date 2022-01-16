import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.scss"
import { useEffect, useState } from 'react'

// This header was a fork from: https://codepen.io/JGallardo/pen/lJoyk
export default function Header() {
  const baseURl = process.env.BASE_URL;
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [fixedHeader, setFixedHeader] = useState(false);
  const headerImageHeight = 400;

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])



  const onScroll = () => {
    if (window.scrollY >= headerImageHeight) {
      setFixedHeader(true)
    } else {
      setFixedHeader(false)
    }
  }

  // Photo by MontyLov on Onsplash 
  return (
    <header className={styles.header}>
      <div className={styles["header-banner"]}>
        <h1>College Club Row</h1>
      </div>
      <div className="clear" />
      <nav className={fixedHeader === true ? styles['fixed-header'] : ""}>
        <div className={fixedHeader === true ? styles['visible-title'] : ""}>College Club Row</div>
        <ul>

          <li>
            <a href="/clubs">Home</a>
          </li>


          <li>
            {/* {`${baseURl}clubs/createclub`} */}
            <a href="/clubs/createclub">Create Club</a>
          </li>
          <li>

            <a href="/clubs/contact">Contact</a>
          </li>
          {!session && (
            <li>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </li>
          )}
          {session && (
            <li>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>

  )
}


// <header>
//       <noscript>
//         <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
//       </noscript>
//       <div className={styles.signedInStatus}>
//         <p
//           className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
//             }`}
//         >
//           {!session && (
//             <>
//               <span className={styles.notSignedInText}>
//                 You are not signed in
//               </span>
//               <a
//                 href={`/api/auth/signin`}
//                 className={styles.buttonPrimary}
//                 onClick={(e) => {
//                   e.preventDefault()
//                   signIn()
//                 }}
//               >
//                 Sign in
//               </a>
//             </>
//           )}
//           {session && (
//             <>
//               {session.user.image && (
//                 <span
//                   style={{ backgroundImage: `url('${session.user.image}')` }}
//                   className={styles.avatar}
//                 />
//               )}
//               <span className={styles.signedInText}>
//                 <small>Signed in as</small>
//                 <br />
//                 <strong>{session.user.email || session.user.name}</strong>
//               </span>
//               <a
//                 href={`/api/auth/signout`}
//                 className={styles.button}
//                 onClick={(e) => {
//                   e.preventDefault()
//                   signOut()
//                 }}
//               >
//                 Sign out
//               </a>
//             </>
//           )}
//         </p>
//       </div>
//       <nav>
//         <ul className={styles.navItems}>
//           <li className={styles.navItem}>
//             <Link href="/">
//               <a>Home</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/client">
//               <a>Client</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/server">
//               <a>Server</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/protected">
//               <a>Protected</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/api-example">
//               <a>API</a>
//             </Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/middleware-protected">
//               <a>Middleware protected</a>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>