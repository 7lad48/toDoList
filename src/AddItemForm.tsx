import React, {FC, ChangeEvent, KeyboardEvent, useState} from 'react';
type AddItemFormType ={
    callback: (title: string)=>void;
}

const AddItemForm:FC<AddItemFormType> = (props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItemTitle();
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItemTitle = () => {
            if (title.trim() !== "") {
                props.callback(title.trim());
                setTitle("");
            } else {
                setError("Title is required");
            }
        }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItemTitle}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default AddItemForm;