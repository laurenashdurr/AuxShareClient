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
                <About token={this.props.token}/>
                <button onClick={(e) => this.props.clearToken()}>Logout</button>
                <MyMixes token={this.props.token}/>
            </div>
        )
    }

}

