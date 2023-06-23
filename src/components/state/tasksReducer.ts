import {TodolistStateType} from "../../App";

// export type RemoveTodoListActionType = {
//     type: 'REMOVE-TODOLIST'
//     id: string
// }
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type ActionType2 = {
    type: string
    [key: string]: string
}
type ActionTypes = RemoveTaskActionType | ActionType2



export const tasksReducer = (state: TodolistStateType, action: ActionTypes): TodolistStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t=>t.id!==action.taskId)};
        case ' ':
            return state;
        default:
            throw new Error('action type is not found ');
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE_TASK', taskId, todolistId} as const;
}
