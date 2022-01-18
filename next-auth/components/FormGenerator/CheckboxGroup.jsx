import React from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function CheckboxGroup({ formLabel, li, deleteable = false, checkboxDeleteHandler = (e) => { } }) {
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{formLabel}</FormLabel>
            <FormGroup
                aria-labelledby="checkbox-group-label"
                name="checkbox-list-group">
                {
                    li.map((l, key) => {
                        return (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel key={key} value={l.value} control={<Checkbox />} label={l.label} />
                                {deleteable && <IconButton id={l.value} onClick={(e) => checkboxDeleteHandler(l.value)}> <DeleteIcon /> </IconButton>}
                            </Box>
                        )
                    })
                }
            </FormGroup>
        </FormControl>

    )
}

export default CheckboxGroup
