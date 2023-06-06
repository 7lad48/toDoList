import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './components/Todolist';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistStateType = {
    [key: string]: TaskType[]
}
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to read', filter: 'all'},
    ]);
    let [tasks, setTasks] = useState<TodolistStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Samurai book", isDone: false},
            {id: v1(), title: "How to learn React", isDone: false},
        ]
    });

    function removeTask(todolistId:string, id: string) {
        let filteredTasks = tasks[todolistId].filter(t => t.id != id);
        setTasks({...tasks, [todolistId]: filteredTasks});
    }

    function addTask(todolistId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        tasks[todolistId] = [task, ...tasks[todolistId]];
        setTasks({...tasks});
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        let task = tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }
    function changeTitle(todolistId: string, taskId: string, newTitle: string){
        let task = tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
        }
        setTasks({...tasks});
    }
    function changeFilter(todolistId: string, value: FilterValuesType) {
        // setFilter(value);
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value} : todolist));
    }
    function removeTodolist(todolistId: string){
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistId]: []});
    }
    const changeTodolistTitle = (todolistId: string, newTodolistTitle: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title: newTodolistTitle} : todolist));
    }
    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            {todolists.map(todolist => {
                let tasksForTodolist = tasks[todolist.id];
                if (todolist.filter === "active") {
                    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
                }
                if (todolist.filter === "completed") {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
                }
                return <Todolist
                    key={todolist.id}
                    id={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTitle}
                    filter={todolist.filter}
                    changeTodolistTitle={changeTodolistTitle}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
