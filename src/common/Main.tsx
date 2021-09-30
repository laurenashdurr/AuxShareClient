
import React from 'react'

import {Footer} from "./Footer"

type MainProps = {
    clearToken: Function,
    token: string
}

export class Main extends React.Component<MainProps, {}> {
    render() {
        return (
            <>
            <Footer clearToken={this.props.clearToken} token={this.props.token}/>
            </>
        )
    }

}