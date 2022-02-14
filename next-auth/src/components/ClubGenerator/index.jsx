import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import $ from "./index.module.scss"
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button"
import { useRouter } from 'next/router';
import axios from 'axios';

function index() {
    const [isMounted, setIsMounted] = useState(true)
    const router = useRouter()
    const clubNameRef = useRef("");
    const clubIDRef = useRef("");
    const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
            setIsMounted(false)
        }
    }, [])


    const generateClubHandler = async () => {
        if (isMounted) {
            const clubName = clubNameRef.current.value;
            const clubID = clubIDRef.current.value;
            const res = await axios.get(baseUrl + "/api/club/", { params: { clubID } })

            if (!res.data.Item) {
                console.log("clubID not found");
                return;
            }

            console.log(res.data.Item)
            router.push('dashboard')
        }

    }
    return <div className={$.container} >
        {/* <TextField multiline={true} fullWidth id={e.id} placeholder={e.description} label={e.label} variant="outlined" required={e.required} /> */}
        <TextField inputRef={clubIDRef} className={$.item} label="Club ID" placeholder='Enter your club access code' />
        <TextField inputRef={clubNameRef} className={$.item} label="Club Name" placeholder='Enter your club Name' />
        <Button type='submit' onClick={generateClubHandler} sx={{ mt: '2em' }} color='primary' variant='contained'>Generate</Button>
    </div>
}

export default index;
