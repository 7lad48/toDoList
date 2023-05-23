import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList/TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
function App(): JSX.Element {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
    const removeTask = (taskId: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId);
        setTasks({...tasks});
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        const todolistTasks = tasks[todolistId];
        tasks[todolistId] = [newTask, ...todolistTasks];
        setTasks({...tasks});
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        //setTasks(tasks.map(task => task.id === taskId ? {...task, isDone} : task));
        const todolistTasks = tasks[todolistId];
        const task = todolistTasks.find(task => task.id === taskId)
        if(task){
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const OnChangeFilter = (todolistId:string, filterValue:FilterValuesType) => {
        setTodolists(prev => prev.map( list => list.id === todolistId ? {...list, filter:filterValue} : list) );
    }
    const removeTodolist = (id:string) => {

    }
    return (
        <div className="App">
            {todolists.map(list => {
                let allTodolistTasks = tasks[list.id]
                let tasksForTodolist = allTodolistTasks
                if (list.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                }
                if (list.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                }
                return <TodoList
                    key={list.id}
                    id={list.id}
                    listTitle={list.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={OnChangeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={list.filter}
                />
            })}

        </div>
    );
}

export default App;

