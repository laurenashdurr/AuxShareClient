import React from 'react'

type LoginProps = {
    updateToken: Function,
}

type LoginState = {
    username: string,
    password: string
}

export class Login extends React.Component <LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:3000/auth/login', {
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
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input onChange={(e) => this.setState({username: e.target.value})} name="username" value={this.state.username} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.state.password} />
                    </div>
                    <button type="submit">Login</button>
                </form>


    

            </div>
        )
    }

}