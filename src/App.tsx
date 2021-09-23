import { Component } from 'react';
import './App.css';
import { Auth } from './auth'
import { Home } from './home'

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

async componentDidMount(){
  let token = localStorage.getItem('token')
  if (token){
    this.setState({ sessionToken: token});
  }
}

updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken});
    console.log(this.state.sessionToken);
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: ''});
  }


  render() {
    
    
    return (
      <div className="App">

        {!this.state.sessionToken ? <Auth updateToken={this.updateToken} />
        : <Home clearToken={this.clearToken}/>
        }
      </div>
    )
  }
}


export default App;
