import React from 'react'
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { TextField, Button, Container, Box, Typography} from '@mui/material'
import { Link } from 'react-router-dom'

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loginEmail: '',
            loginPass: '',
            errorMsg: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({loginEmail: e.target.value})
    }

    onPassChange = (e) => {
        this.setState({loginPass: e.target.value})
    }

    handleSubmit = () => {
        fetch('http://localhost:3001/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'email': this.state.loginEmail,
                'password': this.state.loginPass
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.history.replace('/')
            }else if(user){
                console.log(user)
                this.setState({open: true})
                this.setState({errorMsg: user})
            }
        })
    }

    handleClose = () => {
        this.setState({open: false})
    }


    render() {
        return (
                <Container component="main" maxWidth="xs">
                    <Box sx={{marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography component="h1" variant="h2">
                            Sign in
                        </Typography>
                        <Box noValidate sx={{ mt: 1 }}>
                            <TextField onChange={this.onEmailChange} margin='normal' id="email" name='email' label="Email" variant="standard" required fullWidth autoFocus/>
                            <TextField onChange={this.onPassChange} margin='normal' id="password" label="Password" type="password" autoComplete="current-password" variant="standard" fullWidth required/>
                            <ErrorMessage message={this.state.errorMsg} open={this.state.open} handleClose={this.handleClose}/>
                            <Button onClick={this.handleSubmit} fullWidth variant='contained' sx={{mt: 3, mb: 2}}>Sign in</Button>
                        </Box>
                        <Link to='/register'>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Container>
        )
    }
}

export default SignIn
