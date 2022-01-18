import { React, useRef, useState, useEffect } from 'react'
import CustomInput from './customInput'
import $ from './Index.module.scss'
import Input from '../Input'
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonsGroup_Custom from './RadioButtonsGroup_Custom';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import FormDisplay from './FormDisplay';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
function Index() {
    const labelRef = useRef();
    const [labelText, setLabelText] = useState('')
    const tagRef = useRef();
    const multipleChoiceOptionRef = useRef('');
    const requiredRef = useRef()
    const descriptionRef = useRef();
    const [tagArr, setTagArr] = useState([])
    const [tagType, setTagType] = useState('short-answer')
    const [multipleChoiceArr, setMultipleChoiceArr] = useState([])


    function varNameGenerator(str, timeStemp = true, time = Date.now()) {
        //check for undefined property!!!!!
        var varname = str.replace(/[^a-zA-Z0-9]/g, "");
        if (!timeStemp)
            return varname;
        return (varname + time);
    }

    function deleteTagHandler(e) {
        const targetId = e.target.id;
        setTagArr(tagArr.filter(item => item.id !== targetId));
    }
    function optionDeleteHandler(e) {
        const targetValue = e;
        console.log("handle is on to delete", e)
        setMultipleChoiceArr(multipleChoiceArr.filter(item => item.value !== targetValue))
    }

    useEffect(() => {
        //reset refs
        setLabelText('');
        setTagType("short-answer");
        requiredRef.current.value = '';
        descriptionRef.current.value = '';
        return () => {
        }
    }, [tagArr])

    console.log(tagArr)

    function getTag(tagType) {
        var tag = "", label = '', type = '', max = '', min = '', id = '', tagType = tagType,
            classes = '', placeholder = '', required = '', values = '', description = '';
        if (tagType === "short-answer") {
            tag = 'input';
            type = 'text';
            min = 1;
            max = 200;
        } else if (tagType === 'paragraph') {
            tag = 'textarea';
            type = 'text';
            min = 1;
            max = 500;
        } else if (tagType === 'multiple-choice') {
            tag = 'select';
            type = 'option';
            values = multipleChoiceArr;

        }
        return { tag, type, max, min, id, classes, placeholder, required, values, description, tagType }
    }

    const addTagHandler = e => {
        const description = descriptionRef.current.value;
        const required = requiredRef.current.checked;
        const tag = getTag(tagType);
        tag.description = description;
        tag.label = labelText;
        tag.required = required;
        tag.id = varNameGenerator(labelText);
        setTagArr(preState => [...preState, tag]);
    }

    const addMultipleChoiceHandler = e => {
        //check for empty
        const label = multipleChoiceOptionRef.current.value;
        const newOption = { value: varNameGenerator(label), label }
        setMultipleChoiceArr(preState => [...preState, newOption]);
        multipleChoiceOptionRef.current.value = '';
    }

    return (
        <div className={$.formWrap}>
            <div className={$.columnFlex}>
                <div className={$.formElement}>
                    <TextField value={labelText} onChange={e => setLabelText(e.target.value)} id="tagLabel" label="Label" variant="standard" />

                    <div className={$.select} >
                        <select value={tagType} onChange={e => { setTagType(e.target.value) }} >
                            <option value='short-answer'>Short Answer</option>
                            <option value='paragraph'>Paragraph</option>
                            <option value='multiple-choice'>Multiple Choice</option>
                            <option value='check-box'>Check Box</option>
                            <option value='file-upload'>File Upload</option>
                        </select>
                    </div>
                </div>
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
                                        <Button onClick={addMultipleChoiceHandler} color='secondary' variant='contained'>Add Option</Button>
                                    </InputAdornment>
                                )
                            }}
                            variant="standard"
                        />

                        <RadioButtonsGroup_Custom deleteable={true} formLabel={labelText} li={multipleChoiceArr} optionDeleteHandler={optionDeleteHandler}></RadioButtonsGroup_Custom>

                    </div>
                )}
                <TextField inputRef={descriptionRef} id="standard-basic" label="Short Description (optioanl)" variant="standard" />
                <div className={$.requiredSwitch}>
                    <p>Required</p>
                    <Switch inputRef={requiredRef} />
                </div>
                <Button onClick={addTagHandler} color='primary' variant='contained'>Add</Button>
            </div>
            <FormDisplay deleteTagHandler={deleteTagHandler} tagArr={tagArr} />

        </div >
    )
}

export default Index
