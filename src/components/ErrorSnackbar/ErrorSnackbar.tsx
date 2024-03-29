import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    // const [open, setOpen] = useState(true)
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
        // setOpen(false)
    }
    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal:'center', vertical: 'bottom'}}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
