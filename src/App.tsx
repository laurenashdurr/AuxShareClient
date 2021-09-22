import { Component } from 'react';
import './App.css';
import { Auth } from './auth'
import { Home } from './home'

type AppState = {
  sessionToken: string
}

class App extends Component<{}, AppState> {

  constructor(props: string) {
    super(props)
    this.state = {
      sessionToken: '',
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


  render() {
    
    
    return (
      <div className="App">

        {!this.state.sessionToken ? <Auth updateToken={this.updateToken}/>
        : <Home/>
        }
      </div>
    )
  }
}
// alternative code 


// protectedViews = () => {
//   return (this.state.sessionToken === localStorage.getItem('token') ? <Home/>
//   : <Auth updateToken={this.updateToken}/>)
// }

// render() {
  
  
//   return (
//     <div className="App">
//       {this.protectedViews()}
//     </div>
//   )
// }

export default App;
