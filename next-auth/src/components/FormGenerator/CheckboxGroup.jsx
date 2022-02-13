import { React, useState, useMemo } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function CheckboxGroup({ formLabel, li, deleteable = false, deleteModHandler = (e) => { }, inputHandler = (e = "") => { return false; } }) {
    const [checkBoxList, setCheckBoxList] = useState(li);
    const handleUserInput = useMemo(() => inputHandler(), []);
    const handleChange = (e, index) => {
        if (handleUserInput === false) return false;

        let tempArr = [...checkBoxList];
        tempArr[index].value = e.target.checked;
        setCheckBoxList(tempArr)
        inputHandler(tempArr)
    };

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{formLabel}</FormLabel>
            <FormGroup
                aria-labelledby="checkbox-group-label"
                name="checkbox-list-group">
                {
                    checkBoxList.map((l, key) => {
                        return (
                            <Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControlLabel value={l.label} control={<Checkbox onChange={(e) => { handleChange(e, key) }} />} label={l.label} />
                                {deleteable && <IconButton id={l.value} onClick={(e) => deleteModHandler(l.value)}> <DeleteIcon /> </IconButton>}
                            </Box>
                        )
                    })
                }
            </FormGroup>
        </FormControl>

    )
}

export default CheckboxGroup
