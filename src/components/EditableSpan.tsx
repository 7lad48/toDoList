import React, {ChangeEvent, useState} from 'react';

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
    ? <input autoFocus onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title}/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

export default EditableSpan;