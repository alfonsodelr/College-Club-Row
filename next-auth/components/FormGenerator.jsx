import { React, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function FormGenerator() {
    const [tagType, setTagType] = useState("short-answer")
    const [formContent, setFormContent] = useState({})

    const handleChange = (event) => {
        setTagType(event.target.value);
    };
    return (
        <Container maxWidth='md'>
            <Box sx={{ boxShadow: 2, paddingBottom: 2 }}>
                <Box sx={{
                    // boxShadow: 2,
                    // bgcolor: '#cfe8fc',
                    height: '10vh',
                    display: "flex",
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',

                }}>
                    <TextField id="standard-basic" label="Label" variant="standard" />
                    <Select
                        style={{ minWidth: 300, boder: 'none' }}
                        value={tagType}
                        defaultValue='asdfasdfasdf'
                        labelId='tag-select-label'
                        id='tag-select-label'
                        onChange={handleChange}
                        variant='filled'
                    >
                        <MenuItem value='short-answer'>Short Answer</MenuItem>
                        <MenuItem value='paragraph'>Paragraph</MenuItem>
                        <MenuItem value='multiple-choice'>Multiple Choice</MenuItem>
                        <MenuItem value='check-box'>Check Box</MenuItem>
                        <MenuItem value='file-upload'>File Upload</MenuItem>
                    </Select>
                </Box>
                <Box sx={{
                    position: 'relative',
                    paddingRight: 10,
                    paddingLeft: 10,
                }}>
                    <Button sx={{ float: 'right' }} variant='contained' size="medium">Add</Button>
                    <TextField id="standard-basic" label="Label" variant="standard" />

                </Box>
            </Box>


        </Container >
    )
}

export default FormGenerator
