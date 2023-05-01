import React from 'react';
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[] // Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = ({
                                                   tasks,
                                                   title,
                                                   removeTask,
                                                   changeFilter
                                               }) => {

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map((el) => {
                        return <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => removeTask(el.id)}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
}
export default TodoList;