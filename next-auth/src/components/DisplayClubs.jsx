import React from 'react'
import $ from "./DisplayClubs.module.scss"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'

function DisplayClubs({ clubArr }) {
    return <div className={$.container}>
        {clubArr.map((club, index) => {
            return (
                <div className={$.clubCard}>
                    <img className={$.clubImage} src={`${club.image}`} alt="display image" />
                    <div className={$.clubDetails}>
                        <Typography variant="h5" gutterBottom component="div"> {club.clubName}</Typography>
                        <Typography variant="subtitle1" gutterBottom component="div"> {club.purpose}</Typography>
                    </div>
                    <Button variant='contained' className={$.overLay} >Sign Up</Button>
                </div>

            )
        })}


    </div>
}

export default DisplayClubs 