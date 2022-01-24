import React from 'react';
import $ from './StaticHeader.module.scss'
import Logo from './Logo';
import Head from 'next/head'
import Typography from "@mui/material/Typography"

function StaticHeader({ headerTitle = "", }) {
    return <div>
        <Head>
            <title>{headerTitle}</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <header className={$.header}>
            <div className={$.container}>
                <Logo />
                <Typography>{headerTitle}</Typography>
            </div>
        </header >
    </div >
}

export default StaticHeader;
