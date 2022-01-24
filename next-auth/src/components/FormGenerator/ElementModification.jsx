import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { varNameGenerator } from "../../utils/helper"
function ElementModification({ addHotDisplayArrHandler, tagType = "", }) {
    const checkboxRef = useRef('')
    const multipleChoiceOptionRef = useRef('');
    const tagTypeProp = () => {
        var tagTypeObject = {}
        tagTypeObject["multiple-choice"] = { ref: multipleChoiceOptionRef }
        tagTypeObject["check-box"] = { ref: checkboxRef }
        return tagTypeObject;
    }

    function newModArrElement() { return { value: varNameGenerator(tagType), label: tagTypeProp()[tagType].ref.current.value } }

    const addModHanlder = () => {
        addHotDisplayArrHandler(newModArrElement(tagType))
        tagTypeProp()[tagType].ref.current.value = ""
    }


    return <>
        {tagType === "multiple-choice" && (
            <div>
                <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    inputRef={multipleChoiceOptionRef}
                    id="input-with-icon-textfield"
                    label="multiple choice option"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Radio />
                            </InputAdornment>

                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Button onClick={addModHanlder} color='secondary' variant='contained'>Add Option</Button>
                            </InputAdornment>
                        )
                    }}
                    variant="standard"
                />


            </div>
        )}
        {tagType === "check-box" && (
            <div>
                <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    inputRef={checkboxRef}
                    id="input-with-icon-textfield"
                    label="checkbox choice option"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Checkbox />
                            </InputAdornment>

                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Button onClick={addModHanlder} color='secondary' variant='contained'>Add Option</Button>
                            </InputAdornment>
                        )
                    }}
                    variant="standard"
                />
            </div>
        )}
    </>;
}

export default ElementModification;
