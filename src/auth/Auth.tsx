import React from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { Login } from './Login'
import { Register } from './Register'

import Button from '@mui/material/Button';

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

    toggleFunction = () => {
        this.setState({ authToggle: !this.state.authToggle })

    }


    render() {
        return (
            <Grid
                container spacing={2}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Grid item lg>
                    <h1>Aux Share</h1>
                </Grid>
                <Grid item lg>

                    <Box
                        sx={{
                            width: "flex",
                            height: "flex",
                            bgcolor: 'yellow',
                            borderRadius: 5,
                            textAlign: 'center'
                        }}>


                        {this.state.authToggle ? <Register updateToken={this.props.updateToken} />
                            :
                            <Login updateToken={this.props.updateToken} />
                        }

                        <Button onClick={(e) => this.toggleFunction()} >
                            {this.state.authToggle ? "Already have an account? Login"
                                : "Don't have an account? Sign Up"}
                        </Button>

                    </Box>
                </Grid>
            </Grid>

        )
    }

}