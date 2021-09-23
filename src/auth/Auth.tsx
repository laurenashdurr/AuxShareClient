import React from 'react'

import { Login } from './Login'
import { Register } from './Register'

type AuthProps = {
    updateToken: Function
}

type AuthState = {
    authToggle: boolean
}

export class Auth extends React.Component<AuthProps, AuthState> {

    constructor(props: AuthProps) {
        super(props)
        this.state = {
            authToggle: true
        }

    }


    render() {
        return (
            <div>
              
                {this.state.authToggle ? <Register updateToken={this.props.updateToken} />
                    :
                    <Login updateToken={this.props.updateToken} />
                }

                <button onClick={(e) => this.setState({ authToggle: false })} >Already have an account? Login</button>

            </div>
        )
    }

}