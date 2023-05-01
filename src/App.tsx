import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList/TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {
    const title: string = 'What to learn';

    const [tasks, setTasks] = React.useState<TaskType[]>(
        [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        ]
    );
    const [filter, setFilter] = React.useState<FilterValuesType>('all');
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks);
    }

    const getFilteredTasks = (task: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(el => !el.isDone)
            case "completed":
                return tasks.filter(el => el.isDone)
            default:
                return tasks
        }
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)
    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title={title}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

