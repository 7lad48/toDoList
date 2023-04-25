import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";

function App() {
    return (
        <div className="App">
            <TodoList title="Title number 1"/>
            <TodoList title="Title Number 2"/>
            <TodoList title="Title number 333"/>
        </div>
    );
}

export default App;
