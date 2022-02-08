import { React, useRef, useState, useEffect } from 'react'
import $ from './Index.module.scss'
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormDisplay from './FormDisplay';
import Toolbar from '@mui/material/Toolbar';
import ElementModification from './ElementModification';
import HotDisplay from './HotDisplay';
import { varNameGenerator } from "../../utils/helper"
import axios from 'axios';
//#comment: preferebly use useReducer instead of useStete --yasen
function Index() {
    const [labelText, setLabelText] = useState('')
    const requiredRef = useRef()
    const descriptionRef = useRef();
    const [tagArr, setTagArr] = useState([])
    const [tagType, setTagType] = useState('short-answer')
    const [hotDisplayArr, setHotDisplayArr] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_ORIGIN_RUL;

    useEffect(() => {
        setLabelText('');
        setTagType("short-answer");
        requiredRef.current.checked = "false"
        descriptionRef.current.value = '';
        return () => {
        }
    }, [tagArr])

    useEffect(() => {
        setHotDisplayArr([])
    }, [tagType]);


    function deleteTagHandler(e) {
        const targetId = e.target.id;
        setTagArr(tagArr.filter(item => item.id !== targetId));
    }
    function deleteModHandler(targetValue) {
        setHotDisplayArr(hotDisplayArr.filter(mod => mod.value !== targetValue))
    }


    const addTagHandler = e => {
        const description = descriptionRef.current.value;
        const required = requiredRef.current.checked;
        const tag = getTag(tagType, hotDisplayArr);
        tag.description = description;
        tag.label = labelText;
        tag.required = required;
        tag.id = varNameGenerator(labelText);
        setTagArr(preState => [...preState, tag]);
    }

    const generateFormHandler = async () => {
        // TODO: 
        //api/form POST: body: "clubID", "formID", "tags"
        // 1. get clubID
        // 2. store club form tags
        // 3. redirect to signup page

        //api:
        //update tags, update formID
        // const formRes = await axios.post(baseUrl + "/api/form/", { data: { clubID, formID, tags } })
        // const clubRes = await axios.post(baseUrl + "/api/club/", { data: { clubID, formID, tags } })

        //
    }



    const addHotDisplayArrHandler = (newObj) => {
        setHotDisplayArr(preState => [...preState, newObj])
    }
    return (
        <div className={$.formWrap}>
            <Toolbar>
                <Button onClick={generateFormHandler} sx={{ ml: 'auto' }} color='primary' variant='contained'>Generate</Button>
            </Toolbar>
            <div className={$.columnFlex}>

                {/* first column. Label and Form Element type */}
                <form className={$.formElement}>
                    <TextField required value={labelText} onChange={e => setLabelText(e.target.value)} id="tagLabel" label="Label" variant="standard" />
                    <div className={$.select} >
                        <select value={tagType} onChange={e => { setTagType(e.target.value) }} >
                            <option value='short-answer'>Short Answer</option>
                            <option value='paragraph'>Paragraph</option>
                            <option value='multiple-choice'>Multiple Choice</option>
                            <option value='check-box'>Check Box</option>
                            <option value='file-upload'>File Upload</option>
                        </select>
                    </div>
                </form>

                {/* second & third column. Form Element description and Form Required switch */}
                <TextField inputRef={descriptionRef} id="standard-basic" label="Short Description (optional)" variant="standard" />
                <div className={$.requiredSwitch}>
                    <p>Required</p>
                    <Switch inputRef={requiredRef} />
                </div>

                {/* fourth+ lines. Additional Form Element modification*/}
                <ElementModification addHotDisplayArrHandler={addHotDisplayArrHandler} tagType={tagType} />


                <Button onClick={addTagHandler} color='secondary' variant='contained'>Add</Button>


                {/*last lines. form hot-display area */}
                <HotDisplay tagType={tagType} labelText={labelText} hotDisplayArr={hotDisplayArr} deleteModHandler={deleteModHandler} />
            </div>

            {/* form demo-displa area */}
            <FormDisplay deleteTagHandler={deleteTagHandler} tagArr={tagArr} />

        </div >
    )
}

function getTag(tagType, hotDisplayArr = []) {
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
        values = hotDisplayArr;

    } else if (tagType === 'check-box') {
        tag = 'input';
        type = 'checkbox';
        values = hotDisplayArr;
    } else if (tagType === 'file-upload') {
        tag = 'input';
        type = 'file';
    }
    return { tag, type, max, min, id, classes, placeholder, required, values, description, tagType, label }
}

export default Index
