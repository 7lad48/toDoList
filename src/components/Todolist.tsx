import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    filter: FilterValuesType
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    removeTodolist: (id: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const removeTodolist = () => props.removeTodolist(props.id);
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const changeTodolistTitle = (newTitle: string)=> {
        props.changeTodolistTitle(props.id, newTitle);
    }
    return <div className={'todolist'}>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/><button onClick={removeTodolist}>x</button></h3>
        <AddItemForm callback={addTask}/>
        <ul>
            {
                props.tasks.map(task => {
                    const onClickHandler = () => props.removeTask(props.id, task.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, task.id, e.currentTarget.checked);
                    }
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.id, task.id, newTitle);
                    }
                    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeStatusHandler}
                               checked={task.isDone}/>
                        {/*<span>{t.title} -- </span>*/}
                        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}

