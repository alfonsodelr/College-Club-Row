import react from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

export default function RadioButtonsGroup_Custom({ formLabel, li, deleteable = false, deleteModHandler = (e) => { } }) {
    return (
        <FormControl >
            <FormLabel id="demo-radio-buttons-group-label">{formLabel}</FormLabel>
            <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                name="radio-buttons-group"
            // onChange={handleChange}
            >
                {
                    li.map((l, key) => {
                        return (
                            <Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel value={l.value} control={<Radio />} label={l.label} />
                                {deleteable && <IconButton id={l.value} onClick={(e) => deleteModHandler(l.value)}> <DeleteIcon /> </IconButton>}
                            </Box>
                        )
                    })
                }
            </RadioGroup>
        </FormControl>
    );
}


