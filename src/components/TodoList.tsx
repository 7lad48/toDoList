import React from 'react';

type PropsType = {
    title: string,
}

export default function TodoList(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/> <span>HTML & CSS</span></li>
                <li><input type="checkbox" checked={true}/> <span>Java Script</span></li>
                <li><input type="checkbox" checked={false}/> <span>React JS</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}
