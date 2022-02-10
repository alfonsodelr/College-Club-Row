import React from 'react';
import MemberLayout from "../../components/layouts/MemberLayout"
function index() {
    return <MemberLayout>
        welcome to member page
    </MemberLayout>
}

export async function getStaticProps(ctx) {

    return {
        props: {
            clubInfo: "clubinfo"
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 43200, // 12 hours in seconds
    }
}
export default index;
