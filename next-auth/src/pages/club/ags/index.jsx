import React from 'react';
import ClubLayout from '../../../components/layouts/ClubLayout';
function index() {
    return <ClubLayout title="AGS" pages={["Signup Form", "members", "tasks"]}>
        hi children
    </ClubLayout>

}

export default index;
