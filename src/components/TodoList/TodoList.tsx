import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
    listTitle: string
    tasks: TaskType[] // Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title:string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = ({
                                                   tasks,
                                                   listTitle,
                                                   removeTask,
                                                   changeFilter,
                                                    addTask,
                                               }) => {
    const tasksList = tasks.map((el) => {
        const removeButtonHandler = () => {
            removeTask(el.id)
        }
        return <li key={el.id}>
            <input type="checkbox" checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={removeButtonHandler}>X</button>
        </li>
    })
    const [title, setTitle] = useState('');
    const addTaskButtonHandler = () => {
        if(title.trim()){
            addTask(title.trim());
            setTitle('');
        }
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => { // KeyboardEvent needs to be added import from 'react' manually
         if(e.key === 'Enter') addTaskButtonHandler()
    }
    const setAllTasks = () => {
        changeFilter('all');
    }
    const setActiveTasks = () => {
        changeFilter('active');
    }
    const setCompletedTasks = () => {
        changeFilter('completed');
    }

    return (
        <div className="todolist">
            <h3>{listTitle}</h3>
            <div>
                <input onChange={onChangeHandler} value={title} onKeyDown={onKeyPressHandler}/>
                <button onClick={addTaskButtonHandler}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={setAllTasks}>All</button>
                <button onClick={setActiveTasks}>Active</button>
                <button onClick={setCompletedTasks}>Completed</button>
            </div>
        </div>
    );
}
export default TodoList;