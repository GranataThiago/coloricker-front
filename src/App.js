import React, { Component, Fragment } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


// Componentes
import Navigation from './components/Navigation/Navigation'
import UrlInput from './components/UrlInputForm/UrlInput';
import ImageDescription from './components/ImageDescription/ImageDescription';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import UserPalettes from './components/UserPalettes/UserPalettes';


const initialState = {
  imgInput: '',
  imgUrl: '',
  colors: [],
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    points: 0,
    palettes: []
  }
}

class App extends Component{

  constructor(){
    super();
    this.state = initialState;
  }

  signOut = () => {
    this.setState(initialState)
  }

  loadUser = (data) => {
    this.setState({isSignedIn: true})
    this.setState({user: {
      id: data.id,
      name: data.username,
      email: data.email,
      points: data.score
    }})
    
    this.loadUserPalettes();
  }

  loadUserPalettes = () => {
    fetch(`http://localhost:3001/palette/${this.state.user.id}`)
    .then(res => res.json())
    .then(_palettes => {
      if(_palettes.length){
        this.setState(Object.assign(this.state.user, { palettes: _palettes }))
      }
    })
    .catch(err => {console.log(err)})
  }

  onInputChange = (e) => {
    this.setState({imgInput: e.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.imgInput})
    fetch('http://localhost:3001/imageurl', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.imgInput
      })
    })
    .then(res => res.json())
    .then(res => this.setState({colors: res.outputs[0].data.colors}))
    .catch(err => console.log(err))
  }

  render() {

    const { imgUrl, colors, isSignedIn, user } = this.state

    return(
    <Router>
      <div className='app'>
        <Navigation isSignedIn={isSignedIn} signOut={this.signOut}/>
        <Switch>
          <Route path='/' exact render={() => {
            return (
              (isSignedIn) 
              ?           
              <Fragment>
                <UrlInput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} user={user}/>
                {
                  // Si todavia no tenemos una URL de una imagen, mostramos un mensaje 
                  (imgUrl !== '') 
                  ? <ImageDescription url={imgUrl} colors={colors} id={user.id} loadUserPalettes={this.loadUserPalettes}/> 
                  : console.log('No images yet')
                }
              </Fragment>
              : 
              <Redirect to='/signIn' />
            )
          }

          } />
          <Route path='/signin' render={(props) => <SignIn  onSignIn={this.onSignIn} loadUser={this.loadUser} {...props}/>}/>
          <Route path='/register' component={() => <Register />} />
          <Route path='/palettes' render={(props) => <UserPalettes user={user} />}></Route>
      </Switch>
      </div>
    </Router>
  );
}
}

export default App;
