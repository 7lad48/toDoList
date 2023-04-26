import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList/TodoList";

function App() {
    const tasks: TaskType[] = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]
    const tasks2: TaskType[] = [
        {id: 1, title: "HTML & CSS bookmarks", isDone: true},
        {id: 2, title: "learn js", isDone: true},
        {id: 3, title: "React Documentation", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                title="What to learn"/>
            <TodoList
                tasks={tasks2}
                title="What to read"/>
        </div>
    );
}

export default App;

