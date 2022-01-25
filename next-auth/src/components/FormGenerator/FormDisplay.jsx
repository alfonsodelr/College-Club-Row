import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import $ from './Index.module.scss'
import RadioButtonsGroup_Custom from './RadioButtonsGroup_Custom';
import CheckboxGroup from './CheckboxGroup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
function FormDisplay({ tagArr, deleteTagHandler }) {

    return (
        <>
            {
                tagArr.map((e) => {
                    if (e.tagType === 'short-answer') {
                        return (

                            <Box key={e.id} sx={{ flexDirection: 'row', boxShadow: 3 }} className={$.containerFlex} >
                                <TextField multiline={false} fullWidth id={e.id} placeholder={e.description} label={e.label} variant="standard" required={e.required} />
                                <div className={$.divider}></div>
                                <Button onClick={deleteTagHandler} id={e.id} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Box>
                        )
                    } else if (e.tagType === 'paragraph') {
                        return (
                            <Box key={e.id} sx={{ flexDirection: 'row', boxShadow: 3 }} className={$.containerFlex} >
                                <TextField multiline={true} fullWidth id={e.id} placeholder={e.description} label={e.label} variant="outlined" required={e.required} />
                                <div className={$.divider}></div>
                                <Button onClick={deleteTagHandler} id={e.id} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Box>)
                    } else if (e.tagType === 'multiple-choice') {
                        return (
                            <Box key={e.id} sx={{ flexDirection: 'column', boxShadow: 3 }} className={$.containerFlex} >
                                <RadioButtonsGroup_Custom formLabel={e.label} li={e.values}></RadioButtonsGroup_Custom>
                                <Button onClick={deleteTagHandler} id={e.id} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Box>)
                    } else if (e.tagType === 'check-box') {
                        return (
                            <Box key={e.id} sx={{ flexDirection: 'column', boxShadow: 3 }} className={$.containerFlex} >
                                <CheckboxGroup formLabel={e.label} li={e.values}></CheckboxGroup>
                                <Button onClick={deleteTagHandler} id={e.id} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Box>)
                    } else if (e.tagType === 'file-upload') {
                        return (
                            <Box key={e.id} sx={{ flexDirection: 'column', boxShadow: 3 }} className={$.containerFlex} >
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

                                <Button onClick={deleteTagHandler} id={e.id} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Box>)



                    }

                })
            }
        </>
    )
}

export default FormDisplay

