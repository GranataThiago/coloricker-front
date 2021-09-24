import React from 'react'
import { Box } from '@mui/material'
import './Colors.css'

const Color = (data) => {

    const bgColor = data.data.w3c.hex;

    const copyColor = (e) => {
        navigator.clipboard.writeText(e.target.outerText);
    }

    return (
        <Box className="color" onClick={copyColor} sx={{display:'grid', placeItems:'center', width: '80px', height: '80px', bgcolor: bgColor, margin: '.5em', boxShadow:'2px 2px 8px 0px rgba(0, 0, 0, 0.15)', borderRadius:'5px' }}>
            <p className="colorcode">{bgColor}</p>
        </Box>
    )
}

export default Color
