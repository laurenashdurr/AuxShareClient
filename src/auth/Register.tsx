import React from 'react'

import APIURL from '../helpers/environment'

import { Typography, TextField, Button } from '@mui/material'

type RegisterProps = {
    updateToken: Function,
}

type RegisterState = {
    username: string,
    password: string
}

export class Register extends React.Component<RegisterProps, RegisterState> {

    constructor(props: RegisterProps) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${APIURL}/auth/register`, {
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
                    Sign Up
                </Typography>

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div >
                        <TextField helperText="Input a valid username" inputProps={{ maxLength: 15, minLength: 5, title: 'Username must be between 5 and 15 characters'}} required variant="outlined" id="outlined-size-normal" label="Username" defaultValue="Username" onChange={(e) => this.setState({ username: e.target.value })} name="username" value={this.state.username} />
                    </div>
                    <div>
                        <TextField helperText="Input a valid password"  inputProps={{ minLength: 5, pattern:"^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$", title: 'Password must be at least 5 characters, and contain at least one uppercase, numerical, and special character' }} required variant="outlined" id="outlined-size-normal" label="Password" defaultValue="Password" type="password" onChange={(e) => this.setState({ password: e.target.value })} name="password" value={this.state.password} />
                    </div>
                    <Button
                        sx={{
                            color: "white",
                            paddingTop: 2
                        }}
                        variant="text" type="submit">LETS DO IT</Button>
                </form>


            </div>
        )
    }

}
