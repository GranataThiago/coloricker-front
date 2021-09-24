import React from 'react'
import Color from './Colors/Color'
import { Button, Container, Typography, Box, Modal, TextField, Grid, Paper } from '@mui/material'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    outline: '0',
    p: 4,
};

const ImageDescription = ({url, colors, id, loadUserPalettes}) => {
    const [name, setName] = React.useState('');

    // Material UI Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const savePalette = (colors) => {
        handleClose()
        const stringColors = colors.reduce((acc, color) => {
            return color.raw_hex + acc;
        }, '')

        fetch('http://localhost:3001/palette', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': name,
                'colors': stringColors,
                'user_id': id
            })
        })
        .then(palette => {
            loadUserPalettes();
        })
        
    }

    return (
        <Grid container sx={{padding:'2em'}}>

            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">

                    <Box sx={style}>
                        <TextField onChange={handleChange} margin='normal' id="p_name" name='pname' label="Palette name" variant="standard" required fullWidth autoFocus/>
                        <Button onClick={() => savePalette(colors)}> Save </Button>
                    </Box>
        
            </Modal>

            <Grid item xs={12} md={6} xl={5}>
            <Paper variant="outlined">
                <img src={url} alt="UploadedImg" style={{width:'100%'}}/>
            </Paper>
                
            </Grid>
            <Grid item xs={12} md={6} xl={7}>
                <Box sx={{display:'flex', flexFlow: 'row wrap', width: '100%', marginTop: '1em'}}>
                        <Container className="bg" sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <Typography variant='h6'>Main Colors</Typography>
                            <Button onClick={() => handleOpen()}> Save Palette </Button>
                        </Container>
                        
                        {
                            colors.map((color, i) => {
                                return <Color key={i} data={color} />
                            })
                        }
                </Box>
            </Grid>
        </Grid>
    )
}

export default ImageDescription
