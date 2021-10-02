import React from 'react'

import APIURL from '../helpers/environment'

import { Typography, TextField, Button } from '@mui/material'

type LoginProps = {
    updateToken: Function,
}

type LoginState = {
    username: string,
    password: string
}

export class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${APIURL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ user: { username: this.state.username, password: this.state.password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken);
        })

    }
    render() {
        return (
            <div>
                <Typography sx={{
                    paddingBottom: 2,
                }}
                    variant='h3'>
                    Login
                </Typography>

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <TextField required variant="outlined" id="outlined-size-normal" label="Username" defaultValue="Username" onChange={(e) => this.setState({ username: e.target.value })} name="username" value={this.state.username} />
                    </div>
                    <div>
                        <TextField required variant="outlined" id="outlined-size-normal" label="Password" defaultValue="Password" type="password" onChange={(e) => this.setState({ password: e.target.value })} name="password" value={this.state.password} />
                    </div>
                    <Button sx={{
                        color: "white",
                        paddingTop: 2
                    }}
                        variant="text" type="submit">LET ME IN</Button>
                </form>




            </div>
        )
    }

}