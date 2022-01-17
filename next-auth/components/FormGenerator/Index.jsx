import { React, useRef } from 'react'
import CustomInput from './customInput'
import $ from './index.module.scss'
import Input from '../Input'
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
function Index() {
    const labelRef = useRef('');
    const tagRef = useRef('');
    const descriptionRef = useRef('');
    function getTagType(tagType) {
        var tag = "", type = '', max = '', min = '', id = '', classes = '', placeholder = '', required = '', values = '', ;

        if (tagType === "short-answer") {
            tag = 'input';
            type = 'text';
            min = 1;
            max = 200;
        }

        return { tag, type, max, min, id, classes, placeholder, required, values }
    }
    const addTagHandler = e => {
        const labelText = labelRef.current.value;
        const tagType = tagRef.current.value;
        const description = descriptionRef.current.value;


        // { tag: "select", label: "Gender", type: "text", id: "gender", placeholder: "gender", required: true, regex: "", options: ["female", 'male', 'other', 'decline to state'] },

        console.log({ tag: tagType === "short-answer", labelText, description })
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
                    <Switch />
                </div>
                <Button onClick={addTagHandler} sx={{ float: 'right' }} variant='contained' size="medium">Add</Button>
                {/* <Button variant="outlined" startIcon={<DeleteIcon />}></Button> */}
            </div>
        </div>
    )
}

export default Index
