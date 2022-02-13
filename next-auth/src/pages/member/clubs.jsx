import React from 'react';
import MemberLayout from '../../components/layouts/MemberLayout';
import DisplayForm from '../../components/DisplayForm';
import Box from '@mui/material/Box';
import DisplayClubs from '../../components/DisplayClubs';
import axios from 'axios';
function clubs(props) {

    return <MemberLayout >
        <DisplayClubs clubArr={props.clubArr} />
    </MemberLayout >
}

export async function getStaticProps(ctx) {

    const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;
    const res = await axios.get(`${baseUrl}/api/club?clubID=all`)
    // console.log(res.data.Items)

    const clubs = res?.data?.Items || [];
    return {
        props: {
            clubArr: clubs
        },
        revalidate: 3600, //one hour In seconds
    }
}

export default clubs;
