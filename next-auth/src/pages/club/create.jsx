import React from 'react';
import Wave from '../../components/WaveHeader';
import ClubGenerator from "../../components/ClubGenerator"

function create() {
    return <div>
        <Wave headerTitle="Create CLub" />
        <ClubGenerator />
    </div>;
}

create.auth = true;
export default create;
