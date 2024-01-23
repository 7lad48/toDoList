import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ResponseType } from '../api/todolists-api'
import {
    changeTodolistEntityStatusAC,
    changeTodolistEntityStatusActionType
} from "../features/TodolistsList/todolists-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType, todolistId: null | string = null) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
    todolistId && dispatch(changeTodolistEntityStatusAC(todolistId,'failed'));
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType, todolistId: null | string = null) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
    todolistId && dispatch(changeTodolistEntityStatusAC(todolistId,'failed'));
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType | changeTodolistEntityStatusActionType>
