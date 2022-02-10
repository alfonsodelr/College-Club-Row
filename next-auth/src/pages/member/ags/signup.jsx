import React from 'react';
import MemberLayout from '../../../components/layouts/MemberLayout';
import DisplayForm from '../../../components/DisplayForm';
import Box from '@mui/material/Box';
function signup() {
    var tags = [
        {
            min: 1,
            max: 200,
            classes: "",
            values: "the value",
            tagType: "short-answer",
            description: "asdf",
            tag: "input",
            id: "asfd1644369281151",
            placeholder: "the place holder",
            label: "the lable",
            type: "text",
            required: true
        },
        {
            min: 1,
            max: 200,
            classes: "",
            values: "the value",
            tagType: "short-answer",
            description: "asdf",
            tag: "input",
            id: "asfd1644369281151",
            placeholder: "the place holder",
            label: "the lable",
            type: "text",
            required: true
        },
        {
            min: 1,
            max: 200,
            classes: "",
            values: "the value",
            tagType: "short-answer",
            description: "asdf",
            tag: "input",
            id: "asfd1644369281151",
            placeholder: "the place holder",
            label: "the lable",
            type: "text",
            required: true
        },
    ]
    return <MemberLayout>
        <Box sx={{ maxWidth: 1075, margin: '0 auto' }} >
            <DisplayForm tagArr={tags} />
        </Box>
    </MemberLayout >
}

export default signup;
