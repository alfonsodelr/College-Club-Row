import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioButtonsGroup_Custom from '../components/FormGenerator/RadioButtonsGroup_Custom' //'./RadioButtonsGroup_Custom';
import CheckboxGroup from '../components/FormGenerator/CheckboxGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
function DisplayForm({ tagArr }) {

    return (
        <>
            {
                tagArr.map((e) => {
                    if (e.tagType === 'short-answer') {
                        return (
                            <Box key={e.id} sx={{ flexDirection: 'row', boxShadow: 3 }}  >
                                <TextField multiline={false} fullWidth id={e.id} placeholder={e.description} label={e.label} variant="standard" required={e.required} />
                            </Box>
                        )
                    } else if (e.tagType === 'paragraph') {
                        return (
                            <Box key={e.id} sx={{ flexDirection: 'row', boxShadow: 3 }} >
                                <TextField multiline={true} fullWidth id={e.id} placeholder={e.description} label={e.label} variant="outlined" required={e.required} />

                            </Box>)
                    } else if (e.tagType === 'multiple-choice') {
                        return (
                            <Box key={e.id} sx={{ flexDirection: 'column', boxShadow: 3 }}  >
                                <RadioButtonsGroup_Custom formLabel={e.label} li={e.values}></RadioButtonsGroup_Custom>

                            </Box>)
                    } else if (e.tagType === 'check-box') {
                        return (
                            <Box key={e.id} sx={{ flexDirection: 'column', boxShadow: 3 }}  >
                                <CheckboxGroup formLabel={e.label} li={e.values}></CheckboxGroup>

                            </Box>)
                    } else if (e.tagType === 'file-upload') {
                        return (
                            <Box key={e.id} sx={{ flexDirection: 'column', boxShadow: 3 }}  >
                                < h3 > {e.label}</h3 >
                                <Button
                                    varian='default'
                                    component="label"
                                    startIcon={<CloudUploadIcon color='info' />}>
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </Box>)



                    }

                })
            }
        </>
    )
}

export default DisplayForm

