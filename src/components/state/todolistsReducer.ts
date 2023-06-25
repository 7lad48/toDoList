import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

// export const REMOVE_TODOLIST: string = 'REMOVE-TODOLIST';
// export const ADD_TODOLIST: string = 'ADD-TODOLIST';
// export const CHANGE_TODOLIST_TITLE: string = 'CHANGE-TODOLIST-TITLE';
// export const CHANGE_TODOLIST_FILTER: string = 'CHANGE-TODOLIST-FILTER';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ActionTypes =
    RemoveTodoListActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType

export const todolistsReducer = (state: TodolistType[], action: ActionTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state].filter(todolist => todolist.id !== action.id);
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.id ? {...todolist, filter: action.filter} : todolist)
        default:
            throw new Error('action type is not found ');
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}