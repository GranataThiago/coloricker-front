import React from 'react'
import { TextField, Button, Container, Box, Typography } from '@mui/material'
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import UserPalettes from '../UserPalettes/UserPalettes';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            errorMsg: '',
            open: false
        }
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value})
    }

    onPassChange = (e) => {
        this.setState({password: e.target.value})
    }

    onNameChange = (e) => {
        this.setState({name: e.target.value})
    }

    handleSubmit = () => {
        fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'email': this.state.email,
                'name': this.state.name,
                'password': this.state.password
            })
        })
        .then(data => data.json())
        .then(user => {
            if(!user.id){
                this.setState({errorMsg: user})
                this.setState({open: true})
            }
        })
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <ErrorMessage message={this.state.errorMsg} open={this.state.open} />
                        <Box sx={{marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography component="h1" variant="h2">
                                Register
                            </Typography>
                            <Box noValidate sx={{ mt: 1 }}>
                                <TextField onChange={this.onNameChange} margin='normal' id="username" name='username' label="Name" variant="standard" required fullWidth autoFocus/>
                                <TextField onChange={this.onEmailChange} margin='normal' id="email" name='email' label="Email" variant="standard" required fullWidth />
                                <TextField onChange={this.onPassChange} margin='normal' id="password" label="Password" type="password" autoComplete="current-password" variant="standard" fullWidth required/>
                                <Button onClick={this.handleSubmit} type="submit" fullWidth variant='contained' sx={{mt: 3, mb: 2}}>Register</Button>
                            </Box>
                        </Box>
            </Container>
        )
    }
    
}

export default Register
