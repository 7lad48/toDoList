import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
    id: string
    listTitle: string
    tasks: TaskType[] // Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: ( todolistId:string, filterValue: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = ({
                                                   id,
                                                   listTitle,
                                                   tasks,
                                                   removeTask,
                                                   changeFilter,
                                                   addTask,
                                                   changeTaskStatus,
                                                   filter,
                                               }) => {
    const tasksList = tasks.map((el) => {
        const removeButtonHandler = () => removeTask(el.id, id);
        const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            const changedCheckboxStatus = e.currentTarget.checked;
            changeTaskStatus(el.id, changedCheckboxStatus, id);
        }
        return <li key={el.id} className={el.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={el.isDone} onChange={onChangeCheckbox}/>
            <span>{el.title}</span>
            <button onClick={removeButtonHandler}>X</button>
        </li>
    })
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const addTaskButtonHandler = () => {
        if (title.trim()) {
            addTask(title, id);
            setTitle('');
        } else {
            setError('Введите название');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { // KeyboardEvent needs to be added import from 'react' manually
        setError(null);
        if (e.key === 'Enter') addTaskButtonHandler();
    }
    const setAllTasks = () => changeFilter(id,'all');
    const setActiveTasks = () => changeFilter(id,'active');
    const setCompletedTasks = () => changeFilter(id,'completed');

    return (
        <div className="todolist">
            <h3>{listTitle}</h3>
            <div>
                <input
                    onChange={onChangeHandler}
                    value={title}
                    onKeyDown={onKeyPressHandler}
                    className={error ? 'error' : ''}/>
                <button onClick={addTaskButtonHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={setAllTasks} className={filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={setActiveTasks} className={filter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={setCompletedTasks}
                        className={filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    );
}
export default TodoList;