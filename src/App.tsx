import { Component } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';


import { Auth } from './auth'
import {Main} from './common'

type AppState = {
  sessionToken: string,
  clearToken: string
}

class App extends Component<{}, AppState> {

  constructor(props: string) {
    super(props)
    this.state = {
      sessionToken: '',
      clearToken: ''
    }
  }

  async componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.setState({ sessionToken: token });
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: newToken });
    console.log(this.state.sessionToken);
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: '' });
  }


  render() {


    return (
      <Container maxWidth="xl" >
        <CssBaseline />
          {!this.state.sessionToken ? <Auth updateToken={this.updateToken} />
            : <Main clearToken={this.clearToken} token={this.state.sessionToken} />
          }
      </Container>
    )
  }
}


export default App;
