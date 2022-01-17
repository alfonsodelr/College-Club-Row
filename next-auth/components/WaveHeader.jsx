import React from 'react'
import $ from './WaveHeader.module.scss'
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import Head from 'next/head'

// ///mui import 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/MenuSharp';

export default function Wave({ headerTitle = "" }) {
  const [fixedHeader, setFixedHeader] = useState(false);
  const { data: session, status } = useSession()
  const headerImageHeight = 540;

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  const onScroll = () => {

    console.log(window.innerHeight)
    if (window.scrollY >= headerImageHeight) {
      setFixedHeader(true)
    } else {
      setFixedHeader(false)
    }
  }


  // { tag: "input", onblur: onblurHandler, label: "First name", type: "text", id: "fname", placeholder: "first name", required: true, regex: "/^([a-zA-Z0-9 ,.'-]){2,50}$", maxLength: 50 },

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <header className={$.header}>
        <div className={$.waveHeader}>
          {/*Content before waves*/}
          <div className={`${$['inner-header']} ${$.flex}`}>
            {/*Just the logo.. Don't mind this*/}
            <svg
              version="1.1"
              className={$.logo}
              baseProfile="tiny"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 500 500"
              xmlSpace="preserve"
            >
              <path
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth={10}
                strokeMiterlimit={10}
                d="M57,283"
              />
              <g>
                <path
                  fill="#fff"
                  d="M250.4,0.8C112.7,0.8,1,112.4,1,250.2c0,137.7,111.7,249.4,249.4,249.4c137.7,0,249.4-111.7,249.4-249.4
      C499.8,112.4,388.1,0.8,250.4,0.8z M383.8,326.3c-62,0-101.4-14.1-117.6-46.3c-17.1-34.1-2.3-75.4,13.2-104.1
      c-22.4,3-38.4,9.2-47.8,18.3c-11.2,10.9-13.6,26.7-16.3,45c-3.1,20.8-6.6,44.4-25.3,62.4c-19.8,19.1-51.6,26.9-100.2,24.6l1.8-39.7		c35.9,1.6,59.7-2.9,70.8-13.6c8.9-8.6,11.1-22.9,13.5-39.6c6.3-42,14.8-99.4,141.4-99.4h41L333,166c-12.6,16-45.4,68.2-31.2,96.2	c9.2,18.3,41.5,25.6,91.2,24.2l1.1,39.8C390.5,326.2,387.1,326.3,383.8,326.3z"
                />
              </g>
            </svg>
            <h1>{headerTitle}</h1>
          </div>
          {/*Waves Container*/}
          <div>
            <svg
              className={$.waves}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className={$.parallax}>
                <use
                  xlinkHref="#gentle-wave"
                  x={48}
                  y={0}
                  fill="rgba(255,255,255,0.7"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x={48}
                  y={3}
                  fill="rgba(255,255,255,0.5)"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x={48}
                  y={5}
                  fill="rgba(255,255,255,0.3)"
                />
                <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
              </g>
            </svg>
          </div>
          {/* waves ends */}
        </div>
        {/* Header ends /}
        <nav className={fixedHeader === true ? $['fixed-header'] : ""}>
          <div className={fixedHeader === true ? $['visible-title'] : ""}>College Club Row</div>
          <ul>

            <li>
              <a href="/clubs">Home</a>
            </li>

            <li>
              {/* {`${baseURl}clubs/createclub`} /}
              <a href="/clubs/createclub">Create Club</a>
            </li>
            <li>

              <a href="/clubs/contact">Contact</a>
            </li>
            {!session && (
              <li>
                <a
                  href={`/api/auth/signin`}
                  className={$.buttonPrimary}
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
                  className={$.button}
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
                */}

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" > {/*style={{ background: 'white', color: "black" }} */}
            <Toolbar>
              {/*<IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Login</Button> */}
            </Toolbar>
          </AppBar>
        </Box>
      </header>
    </>
  )
}


