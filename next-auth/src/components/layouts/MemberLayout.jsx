import { React, useState } from 'react';
import $ from "./MemberLayout.module.scss"

//MUI components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Tooltip from '@mui/material/Tooltip'; //tootip to explain tools on appBar.
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { urlCleaner } from '../../utils/helper'
// import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/react"

const MemberLayout = ({ clubInfo = undefined, title = "", children, }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const pages = [];
    const clubName = "\\";
    const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL
    const { data: session, status } = useSession()


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleMenuItemClick = (event, index) => {
        console.log("item click handler", pages[index]);
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* ----------screen size md------------ */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            {title}
                        </Typography>


                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, }}>
                            {
                                pages.map((page, index) => (
                                    <Link key={index + page} href={urlCleaner(`/club/${clubName}/${page}`)} passHref>
                                        <Button

                                            onClick={(event) => handleMenuItemClick(event, index)}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            {page}
                                        </Button>
                                    </Link>
                                ))}
                        </Box>


                        {/* ----------screen size xs------------ */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, index) => (
                                    <Link key={index + page} href={urlCleaner(`/club/${clubName}/${page}`)} passHref>
                                        <MenuItem key={page} onClick={(event) => handleMenuItemClick(event, index)} >
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            {title}
                        </Typography>



                        {session && (
                            <>
                                {session.user.image && (
                                    <span
                                        style={{ backgroundImage: `url('${session.user.image}')` }}
                                        className={$.avatar}
                                    />
                                )}
                                <span className={$.signedInText}>
                                    <strong> {session.user.email || session.user.name}</strong>
                                </span>
                                <a
                                    href={`/api/auth/signout`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signOut({ callbackUrl: `${baseUrl}/member/clubs` })
                                    }}
                                >
                                    <Button color="inherit">Sign out</Button>
                                </a>
                            </>
                        )}

                    </Toolbar>
                </Container>
            </AppBar >

            <Box mx="auto" sx={{ maxWidth: 'md', mt: '30px' }} >
                {children}
            </Box>

            {/* maybe some footer here */}
        </>



    );
};
export default MemberLayout;
