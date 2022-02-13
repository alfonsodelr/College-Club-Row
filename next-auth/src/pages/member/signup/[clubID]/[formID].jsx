import React from 'react';
import MemberLayout from '../../../../components/layouts/MemberLayout';
import DisplayForm from '../../../../components/DisplayForm';
import axios from 'axios';
import Loading from '../../../../components/Loading';
function signup({ tagArr }) {

    return <MemberLayout>
        {tagArr !== undefined ? <DisplayForm tagArr={tagArr !== undefined ? tagArr : []} /> : <Loading />}
    </MemberLayout >
}

// This function gets called at build time
export async function getStaticPaths() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;
        var clubForms = await axios.get(`${baseUrl}/api/form?clubID=all&formID=all`)
        clubForms = clubForms.Items !== undefined ? clubForms.Items : []

        // Get the paths we want to pre-render based on clubID of form table
        const paths = clubForms.map((form) => ({
            params: { clubID: form.clubID, formID: form.formID },
        }))
        return { paths, fallback: true }

    } catch (error) {
        console.log('signup/[clubID] getStaticPaths: api/form?clubID=all&formID=all', error.message)
        return { paths: [], fallback: true }
    }
}

// This also gets called at build time
export async function getStaticProps({ params }) {

    // const res = await axios.get(`https://.../posts/${params.id}`)
    // const post = await res.json()
    const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;
    var clubForm = await axios.get(`${baseUrl}/api/form?clubID=${params.clubID}&formID=${params.formID}`)
    // console.log(clubForm.data.Item.tags)
    // Pass post data to the page via props
    return {
        props: { tagArr: clubForm.data.Item.tags },
        revalidate: 2 * 3600,
    }
}



export default signup;
