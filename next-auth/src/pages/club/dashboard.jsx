import React from 'react';
import StaticHeader from '../../components/StaticHeader';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import Link from 'next/link'

function dashboard() {
    const router = useRouter();
    return <div>
        {/* <StaticHeader headerTitle="Club Dashboard" /> */}
        <AppBar>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Club Dashboard
                </Typography>
                <Button color="inherit"><Link href="/form/generate">Signup Form</Link>  </Button>
            </Toolbar>
        </AppBar>
    </div>;
}

export default dashboard;
