//custom input to get the club name
//send the input to back end 
//store it in database

////////////////later improvements: 
//_____dynamic flex with mobile platform


import { React, useRef } from 'react'
import $ from './Page1.module.scss'
import axios from 'axios';

export default function Page1() {
    const clubNameEL = useRef(null)

    const pageSubmitHandler = async (event) => {
        event.preventDefault();
        const clubName = clubNameEL.current.value;

        //this should later be done using next/api
        console.log("server base url is: ", process.env.NEXT_PUBLIC_SERVER_BASE_URL)
        //{ withCredentials: true }
        let res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/club`, { name: clubName }).catch(e => { console.log(e) })

    }

    return (
        <div className={$.signupFrm}>
            <form className={$.form} onSubmit={pageSubmitHandler} >
                <h1 className={$.title}>Create Club</h1>
                <div className={$.inputContainer}>
                    <input type="text" className={$.input} placeholder="a" ref={clubNameEL} />
                    <label className={$.label}>
                        Club Name
                    </label>
                </div>


                <input type="submit" className={$.submitBtn} defaultValue="Sign up" />
            </form>
        </div>

    )
}
