import React from 'react';
import ClubLayout from '../../../components/layouts/ClubLayout';
import FormGenerator from '../../../components/FormGenerator/Index.jsx';
import axios from 'axios';
import { unmarshall } from '@aws-sdk/util-dynamodb';

function signupform() {
    return <ClubLayout title="AGS" pages={["Signup Form", "members", "tasks"]}>
        <FormGenerator />
    </ClubLayout>
}

export async function getServerSideProps(context) {
    const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;
    const res = await axios.get(baseUrl + "/api/club/", { params: { clubID: 111 } })

    if (res.status !== 200) { console.log("getClub info ended with status !==200") }
    if (!res.data.Item) { console.log("Club not found") }
    var data = { data: "dta" }
    // var data = unmarshall(res.data.Item)
    // res.cookie('cookieName', 'cookieValue')
    return {
        props: { ...data }, // will be passed to the page component as props
    }
}

export default signupform;

