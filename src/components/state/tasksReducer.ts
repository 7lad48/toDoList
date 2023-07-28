import {TodolistStateType} from "../../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodoListActionType} from "./todolistsReducer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type ActionTypes = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodoListActionType

export const tasksReducer = (state: TodolistStateType, action: ActionTypes): TodolistStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.taskTitle, isDone: false}, ...state[action.todolistId]]
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDoneStatus
                } : t)
            };
        case 'CHANGE-TASK-TITLE':
            const {payload} = action;
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].map(t => t.id === payload.taskId ? {
                    ...t, title: payload.newTitle
                } : t)
            };
        case 'ADD-TODOLIST':
             return {...state, [action.todolistId]: []};
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState
        //  let {[action.id]:[], ...rest} = state
        //  return rest
        default:
            throw new Error('action type is not found ');
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const;
}
export const addTaskAC = (taskTitle: string, todolistId: string) => {
    return {type: 'ADD-TASK', taskTitle, todolistId} as const;
}
export const changeTaskStatusAC = (taskId: string, isDoneStatus: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, isDoneStatus, todolistId}} as const;
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, newTitle}} as const;
}