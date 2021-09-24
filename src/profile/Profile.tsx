import React from 'react'
import { MyMixes } from './MyMixes'
import { About } from './About'


type ProfileProps = {
    clearToken: Function,
    token: string
}


export class Profile extends React.Component <ProfileProps, {}> {
    render() {
        return(
            <div>
                <h1>My Profile</h1>
                <About token={this.props.token}/>
                <button onClick={(e) => this.props.clearToken()}>Logout</button>
                <MyMixes token={this.props.token}/>
            </div>
        )
    }

}

// About me header that displays the About Component

// + icon (create a mix button) at the top right of the page to navigate to the create a mix page


// My Mixes Section that displays my created mixes


// footer at the bottom of the page 
