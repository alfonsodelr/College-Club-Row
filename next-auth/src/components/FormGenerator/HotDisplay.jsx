import React from 'react';
import RadioButtonsGroup_Custom from './RadioButtonsGroup_Custom';
import CheckboxGroup from './CheckboxGroup';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function HotDisplay({ tagType, labelText, hotDisplayArr, deleteModHandler }) {
    return <>
        {tagType === "multiple-choice" && (
            <RadioButtonsGroup_Custom deleteable={true} formLabel={labelText} li={hotDisplayArr} deleteModHandler={deleteModHandler}></RadioButtonsGroup_Custom>
        )}
        {tagType === "check-box" && (
            <CheckboxGroup deleteable={true} formLabel={labelText} li={hotDisplayArr} deleteModHandler={deleteModHandler}></CheckboxGroup>
        )}
        {tagType === 'file-upload' && (
            <div>
                <h3>{labelText}</h3>
                <Button
                    varian='default'
                    component="label"
                    startIcon={<CloudUploadIcon color='info' />}
                >
                    Upload File
                    <input
                        type="file"
                        hidden
                    />
                </Button></div>
        )}
    </>
}

export default HotDisplay;
