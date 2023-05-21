import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
    listTitle: string
    tasks: TaskType[] // Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
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
                                                   changeTaskStatus,
                                                   filter,
                                               }) => {
    const tasksList = tasks.map((el) => {
        const removeButtonHandler = () => removeTask(el.id);
        const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            const changedCheckboxStatus = e.currentTarget.checked;
            changeTaskStatus(el.id, changedCheckboxStatus);
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
            addTask(title);
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
    const setAllTasks = () => changeFilter('all');
    const setActiveTasks = () => changeFilter('active');
    const setCompletedTasks = () => changeFilter('completed');

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
                <button onClick={setAllTasks} className={ filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={setActiveTasks} className={ filter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={setCompletedTasks} className={ filter === 'completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    );
}
export default TodoList;