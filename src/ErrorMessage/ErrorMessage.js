import React from 'react'
import { Alert, Snackbar } from '@mui/material'

const ErrorMessage = ({open, message, handleClose}) => {


    return (
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        severity='error'
        >       
                <Alert severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
    </Snackbar>
    )
}

export default ErrorMessage
