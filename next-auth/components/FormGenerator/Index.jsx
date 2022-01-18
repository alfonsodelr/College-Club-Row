import { React, useRef, useState, useEffect } from 'react'
import CustomInput from './customInput'
import $ from './index.module.scss'
import Input from '../Input'
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
function Index() {
    const labelRef = useRef();
    const tagRef = useRef();
    const requiredRef = useRef()
    const descriptionRef = useRef();
    const [tagArr, setTagArr] = useState([])


    function varNameGenerator(str, timeStemp = true, time = Date.now()) {
        var varname = str.replace(/[^a-zA-Z0-9]/g, "");
        if (!timeStemp)
            return varname;
        return (varname + time);
    }

    function deleteTagHandler(e) {
        const targetId = e.target.id;
        setTagArr(tagArr.filter(item => item.id !== targetId));
    }

    useEffect(() => {
        //reset refs
        labelRef.current.value = '';
        tagRef.current.value = "short-answer";
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
        }
        return { tag, type, max, min, id, classes, placeholder, required, values, description, tagType }
    }

    const addTagHandler = e => {
        const labelText = labelRef.current.value;
        const tagType = tagRef.current.value;
        const description = descriptionRef.current.value;
        const required = requiredRef.current.checked;
        const tag = getTag(tagType);
        tag.description = description;
        tag.label = labelText;
        tag.required = required;
        tag.id = varNameGenerator(labelText);
        setTagArr(preState => [...preState, tag]);


    }
    return (
        <div className={$.formWrap}>
            <div className={$.columnFlex}>
                <div className={$.formElement}>
                    {/* <Input ref={labelRef} /> */}
                    <TextField inputRef={labelRef} id="tagLabel" label="Label" variant="standard" />

                    <div className={$.select} >
                        <select ref={tagRef} defaultValue="short-answer">
                            <option value='short-answer'>Short Answer</option>
                            <option value='paragraph'>Paragraph</option>
                            <option value='multiple-choice'>Multiple Choice</option>
                            <option value='check-box'>Check Box</option>
                            <option value='file-upload'>File Upload</option>
                        </select>
                    </div>
                </div>
                <TextField inputRef={descriptionRef} id="standard-basic" label="Short Description (optioanl)" variant="standard" />
                <div className={$.requiredSwitch}>
                    <p>Required</p>
                    <Switch inputRef={requiredRef} />
                </div>
                <Button onClick={addTagHandler} color='primary' variant='contained'>Add</Button>
            </div>

            {/* -----------------------form display area ----------------------- */}
            {
                tagArr.map((e) => {
                    if (e.tagType === 'short-answer') {
                        return (
                            <Box key={e.id} sx={{ boxShadow: 3 }} className={$.containerFlex} >
                                <TextField multiline={false} fullWidth id={e.id} placeholder={e.description} label={e.label} variant="standard" required={e.required} />
                                <div className={$.divider}></div>
                                <Button onClick={deleteTagHandler} id={e.id} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Box>)
                    } else if (e.tagType === 'paragraph') {
                        return (
                            <Box key={e.id} sx={{ boxShadow: 3 }} className={$.containerFlex} >
                                <TextField multiline={true} fullWidth id={e.id} placeholder={e.description} label={e.label} variant="outlined" required={e.required} />
                                <div className={$.divider}></div>
                                <Button onClick={deleteTagHandler} id={e.id} variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Box>)
                    }

                })
            }
        </div >
    )
}

export default Index
