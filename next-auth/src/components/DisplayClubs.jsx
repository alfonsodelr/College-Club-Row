import React from 'react'
import $ from "./DisplayClubs.module.scss"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { urlCleaner } from '../utils/helper'

function DisplayClubs({ clubArr }) {
    const router = useRouter()
    const signupHandler = (e) => {
        let clubIndex = e.target.id;
        let clubID = clubArr[clubIndex].clubID;
        let formID = clubArr[clubIndex].formID;
        e.preventDefault();
        router.push(`/member/signup/${clubID}/${formID}`)
    }

    return <div className={$.container}>
        {clubArr.map((club, index) => {
            return (
                <div key={index} className={$.clubCard}>
                    <img className={$.clubImage} src={`${club.image}`} alt="display image" />
                    <div className={$.clubDetails}>
                        <Typography variant="h5" gutterBottom component="div"> {club.clubName}</Typography>
                        <Typography variant="subtitle1" gutterBottom component="div"> {club.purpose}</Typography>
                    </div>
                    <Button id={index} onClick={signupHandler} variant='contained' className={$.overLay} >Sign Up</Button>
                </div>

            )
        })}


    </div >
}

export default DisplayClubs 