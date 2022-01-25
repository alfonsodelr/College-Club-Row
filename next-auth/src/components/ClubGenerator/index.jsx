import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import $ from "./index.module.scss"
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button"
import { useRouter } from 'next/router';
import axios from 'axios';

function index() {
    const router = useRouter()
    const clubNameRef = useRef("");
    const clubIDRef = useRef("");
    const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch('dashboard')
    }, [])

    const generateClubHandler = async () => {
        const clubName = clubNameRef.current.value;
        const clubID = clubIDRef.current.value;
        const res = await axios.get(baseUrl + "/api/club/", { params: { clubID } })

        if (!res.data.Item) {
            console.log("clubID not found");
            return;
        }

        console.log(res.data.Item)

        // console.log(clubID)
        // console.log(res);
        //TODO: 
        //1.checks for club access code
        //2.redirects to club dashboard if credential are correct
        //for a better push example: https://nextjs.org/docs/api-reference/next/router#usage-2
        ///

        router.push('dashboard')

    }
    return <div className={$.container} >
        {/* <TextField multiline={true} fullWidth id={e.id} placeholder={e.description} label={e.label} variant="outlined" required={e.required} /> */}
        <TextField inputRef={clubIDRef} className={$.item} label="Club ID" placeholder='Enter your club access code' />
        <TextField inputRef={clubNameRef} className={$.item} label="Club Name" placeholder='Enter your club Name' />
        <Button type='submit' onClick={generateClubHandler} sx={{ mt: '2em' }} color='primary' variant='contained'>Generate</Button>
    </div>
}

export default index;
