import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie'

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
import { useRouter } from 'next/router';

const MemberLayout = ({ clubInfo = undefined, title = "", children, }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const pages = [];
    const clubName = "\\";
    const router = useRouter();


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

                        <Link href={`/api/auth/signout`}
                            onClick={(e) => {
                                e.preventDefault()
                                signOut()
                            }}>
                            {/* this is the Signout button for later */}
                            <Button color="inherit"></Button>
                        </Link>


                        {/* <a
                            href={`/api/auth/signout`}
                            className={styles.button}
                            onClick={(e) => {
                                e.preventDefault()
                                signOut()
                            }}
                        >
                            Sign out
                        </a> */}

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
