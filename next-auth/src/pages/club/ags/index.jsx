import { React } from 'react';
import ClubLayout from '../../../components/layouts/ClubLayout';
import { getClubID } from '../../../utils/helper';
function index({ clubInfo }) {

    return <ClubLayout clubInfo={clubInfo} pages={["Signup Form", "members", "tasks"]}>
        welcome to ags club {JSON.stringify(clubInfo)}
    </ClubLayout>
}


export async function getStaticProps(ctx) {

    //!!!!!----------this is likely the right approach, but since we don't have that many club right now, I will use static data here.
    // const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;
    // const clubID = getClubID('ags')
    // const res = await fetch(`${baseUrl}/api/club?clubID=${clubID}`)
    // const clubInfo = await res.json()
    return {
        props: {
            clubInfo: { id: getClubID('ags'), name: 'ags' }
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        // revalidate: 10, // In seconds
    }
}

/*
TODO: 
1. set cookies with club info. 
when the form is submitted we already have the cookies. 
*/

export default index;
