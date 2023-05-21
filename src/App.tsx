import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {
    const State: TaskType[] = [
        {id: v1(), title: "HMtL & CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ];
    const listTitle: string = 'What to learn';
    const [tasks, setTasks] = React.useState<TaskType[]>(State);
    const [filter, setFilter] = React.useState<FilterValuesType>('all');

    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks);
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const changedTasks: TaskType[] = tasks.map((task) => {
            if(task.id === taskId){
                task.isDone = isDone
            }
            return task;
        });
        setTasks(changedTasks);
    }
    const getFilteredTasks = (task: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        if(filter === 'active'){
            return tasks.filter(el => !el.isDone)
        }
        return filter === "completed" ? tasks.filter(el => el.isDone) : tasks
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)
    const OnChangeFilter = (filter:FilterValuesType) => setFilter(filter)
    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                listTitle={listTitle}
                removeTask={removeTask}
                changeFilter={OnChangeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;

