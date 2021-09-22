import React from 'react'

type AuthProps = {
    updateToken: Function
}

export class Auth extends React.Component <AuthProps,{}> {
    render() {
        return(
            <div>
                {this.props.updateToken}
                This is the auth component
            </div>
        )
    }

}