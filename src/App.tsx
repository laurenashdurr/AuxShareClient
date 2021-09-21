import React from 'react';
import './App.css';
import { CreateMixButton, Footer } from './common'


class App extends React.Component {

  render() {

    return (
      <div className="App">
        <CreateMixButton />
        This is the main app
        <Footer />
      </div>
    )
  }
}

export default App;
