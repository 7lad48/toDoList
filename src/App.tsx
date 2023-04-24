import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";

function App() {
    return (
        <div className="App">
            <TodoList title="Title1"/>
            <TodoList title="Title 2"/>
            <TodoList title="Title 333"/>
        </div>
    );
}

export default App;
