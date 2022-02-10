import React from 'react';
import MemberLayout from '../../components/layouts/MemberLayout';
import DisplayForm from '../../components/DisplayForm';
import Box from '@mui/material/Box';
import DisplayClubs from '../../components/DisplayClubs';
function clubs() {
    const purpose = "Alpha Gamma Sigma (AGS) is a statewide \
    community college honor society. Its purpose is to foster, promote,\
     maintain, and recognize excellence in scholastic achievement as well\
      as to provide the campus and community with online virtual volunteering."

    const clubArr = [
        {
            clubID: "111",
            clubName: "AGS",
            formID: "",
            purpose,
            image: "https://i.imgur.com/fzRgRaV.png",
        },
        {
            clubID: "112",
            clubName: "CS",
            formID: "",
            purpose,
            image: "https://i.imgur.com/fzRgRaV.png",
        }, {
            clubID: "113",
            clubName: "Stem",
            formID: "",
            purpose,
            image: "https://i.imgur.com/fzRgRaV.png",
        }, {
            clubID: "114",
            clubName: "Psychology",
            formID: "",
            purpose,
            image: "https://i.imgur.com/fzRgRaV.png",
        }, {
            clubID: "115",
            clubName: "Engineering",
            formID: "",
            purpose,
            image: "https://i.imgur.com/fzRgRaV.png",
        }
    ]
    return <MemberLayout >
        <DisplayClubs clubArr={clubArr} />
    </MemberLayout >
}

export default clubs;
