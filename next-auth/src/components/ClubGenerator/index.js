import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import $ from "./index.module.scss"
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button"
import { useRouter } from 'next/router'
function index() {
    const router = useRouter()

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('dashboard')
    }, [])
    const generateClubHandler = () => {

        //TODO: 
        //1.checks for club access code
        //2.redirects to club dashboard if credential are correct
        //for a better push example: https://nextjs.org/docs/api-reference/next/router#usage-2

        router.push('dashboard')

    }
    return <div className={$.container} >
        {/* <TextField multiline={true} fullWidth id={e.id} placeholder={e.description} label={e.label} variant="outlined" required={e.required} /> */}
        <TextField className={$.item} label="Club Code" placeholder='Enter your club access code' />
        <TextField className={$.item} label="Club Name" placeholder='Enter your club Name' />
        <Button type='submit' onClick={generateClubHandler} sx={{ mt: '2em' }} color='primary' variant='contained'>Generate</Button>
    </div>
}

export default index;
