import React from 'react'
import './UrlInput.css'
import { Typography, Input, Button } from '@mui/material'

const UrlInput = ({onInputChange, onButtonSubmit, user}) => {
    return (
        <section className="urlinput">
                    <Typography className="urlinput__title" variant='h2' sx={{textAlign:'center'}}>Palette Generator</Typography>
                    <Typography paragraph sx={{textAlign:'center', color:'#555'}}>Create palettes from your photos.</Typography>
                    <div className="urlinput__form">
                        <Input type="text" onChange={onInputChange} autoFocus fullWidth placeholder="Image url here..."/>
                        <Button onClick={onButtonSubmit} variant="outlined"> Generate </Button>
                    </div>
        </section>
    )
}

export default UrlInput
