import React from 'react'
import Palette from './Palette/Palette'
import { Typography } from '@mui/material'


const UserPalettes = ({user}) => {

    return (
        <section>
            <Typography variant='h4' sx={{fontWeight:'500', marginLeft:'1em'}}> Hey {user.name} these are your palettes! </Typography>
            <div style={{display: 'flex', flexFlow: 'row wrap'}}>
                {
                    user.palettes && user.palettes.map((palette, i) => {
                        return <Palette key={i} data={palette}></Palette>
                    })
                }
            </div>
            
        </section>
    )
}

export default UserPalettes
