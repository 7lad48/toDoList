import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newValue: string)=>void
}
function EditableSpan(props:EditableSpanType){
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    return editMode
    ? <TextField autoFocus onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title} variant="standard"/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

export default EditableSpan;