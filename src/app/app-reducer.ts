export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

// type InitialStateType = typeof initialState


export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type ActionsType = SetAppStatusActionType
    | SetAppErrorActionType;
