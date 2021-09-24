import React from 'react'
import {Typography, Container, Box, Modal, Fab } from '@mui/material'
import './Palette.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 'none',
    outline: 'o',
    p: 4,
};

const Palette = ({data}) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const copyColor = (e) => {
        navigator.clipboard.writeText(e.target.outerText);
    }

    const colors = data.colors.split('#').slice(1)

    return (
        <div className="palette" onClick={handleOpen}>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-get-palette"
                aria-describedby="modal-show-colors">
                    <Box sx={style}>
                        <Typography gutterBottom variant="h3" sx={{textAlign:'center'}}>
                                {data.nombre}
                        </Typography>
                        {
                            colors.map((color, i) => {
                                return (
                                    <Container key={i} sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '0.25em'}}>
                                        <Box sx={{width: '40%', height:'50px', bgcolor:`#${color}`}} />
                                        <Typography className="colorname" variant="h6" onClick={(e) => copyColor(e)}>
                                            #{color}
                                        </Typography>
                                    </Container>
                                )
                            })
                        }

                    </Box>
            </Modal>

            <div>
                <Typography gutterBottom variant="h5" component="div">
                    {data.nombre}
                </Typography>
                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', width:"100%"}}>
                    {
                        colors.map((color, i) => {
                            return <Box key={i} sx={{width: '40%', height:'50px', bgcolor:`#${color}`}}></Box>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Palette
