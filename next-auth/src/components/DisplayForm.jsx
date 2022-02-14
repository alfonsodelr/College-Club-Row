import { React, useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import axios from 'axios';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioButtonsGroup_Custom from '../components/FormGenerator/RadioButtonsGroup_Custom' //'./RadioButtonsGroup_Custom';
import CheckboxGroup from '../components/FormGenerator/CheckboxGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import $ from './DisplayForm.module.scss'

function DisplayForm({ tagArr }) {
    const { data: session, status } = useSession()
    const [userInput, setUserInput] = useState([...tagArr])
    const [isMounted, setIsMounted] = useState(true)
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;

    const inputHandler = (value, index) => {
        setUserInput((userInput) => { userInput[index].values = value; return userInput; })
    }

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
            setIsMounted(false)
        }
    }, [])


    const submithandler = async () => {
        try {
            if (isMounted === true) {
                const formID = router.asPath.split('/').reverse()[0];
                const clubID = router.asPath.split('/').reverse()[1];
                const userID = session.userID;
                const formResponse = await axios.post(baseUrl + "/api/form/userinput", { userID, formID, tags: userInput })
                const clubResponse = await axios.patch(baseUrl + "/api/club", { clubID, key: 'members', value: userID, action: 'append_role' })
                    .catch(err => {
                        if (err.response.status === 302) {
                            console.log("status=302. form already exist")
                        } else {
                            console.log(err.response);
                            throw `DisplayForm.submitHandler: ${err.response}`
                        }
                    }).then(res => {

                    })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    if (status !== "authenticated") {
        return <a href="/api/auth/signin">Sign in</a>
    }
    return (
        <>
            <form onSubmit={submithandler} className={$.flexContainer}>
                {
                    tagArr.map((tag, index) => {
                        if (tag.tagType === 'short-answer') {
                            return (
                                <div key={index} className={$.shortAnswer}>
                                    <TextField onChange={(e) => { inputHandler(e.target.value, index) }} multiline={false} fullWidth id={tag.id} placeholder={tag.description} label={tag.label} variant="standard" required={tag.required} />
                                </div>
                            )
                        } else if (tag.tagType === 'paragraph') {
                            return (
                                <div key={index} className={$.paragraph}>
                                    <TextField onChange={(e) => { inputHandler(e.target.value, index) }} multiline={true} fullWidth id={tag.id} placeholder={tag.description} label={tag.label} variant="outlined" required={tag.required} />

                                </div>
                            )
                        } else if (tag.tagType === 'multiple-choice') {
                            return (
                                <div key={index} className={$.myltipleChoice}>
                                    <RadioButtonsGroup_Custom inputHandler={(value) => { inputHandler(value, index) }} formLabel={tag.label} li={tag.values} required={tag.required}></RadioButtonsGroup_Custom>
                                </div>
                            )
                        } else if (tag.tagType === 'check-box') {
                            return (

                                <div key={index} className={$.checkBox}>
                                    <CheckboxGroup inputHandler={(value) => { inputHandler(value, index) }} formLabel={tag.label} li={tag.values} required={tag.required}></CheckboxGroup>
                                </div>
                            )
                        } else if (tag.tagType === 'file-upload') {
                            return (
                                <div key={index} className={$.fileUpload}>
                                    < h3 > {tag.label}</h3 >
                                    <Button
                                        varian='default'
                                        component="label"
                                        startIcon={<CloudUploadIcon color='info' />}>
                                        Upload File
                                        <input
                                            type="file"
                                            hidden
                                        />
                                    </Button>
                                </div>
                            )
                        }
                    })
                }
                <Button type='submit' variant='contained'>Submit</Button>
            </form>
        </>
    )
}


export default DisplayForm

