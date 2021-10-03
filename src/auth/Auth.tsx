import React from 'react'

import { Typography, Box, Grid } from '@mui/material';



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
                justifyContent="center"
                alignItems="center"
            >

                <Grid
                    item
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                >
                    <Typography
                        sx={{
                           
                            paddingTop: 7,
                            fontSize: 75,
                        }}

                        variant='h1'>
                        Aux Share
                    </Typography>

                    <Typography
                        sx={{
                            paddingBottom: 5,
                            fontSize: 25,
                        }}
                        variant='h1'>
                        Create a mix, pass the aux
                    </Typography>

                    <Box
                        sx={{
                            minWidth: 300,
                            minHeight: 300,
                            maxWidth: 700,
                            maxHeight: 700,
                            bgcolor: '#6200EE',
                            borderRadius: 17,
                            textAlign: 'center',
                            color: "white",
                            alignContent: "center",
                            justifyContent: "center",
                            padding: 5
                        }}>


                        {this.state.authToggle ? <Register updateToken={this.props.updateToken} />
                            :
                            <Login updateToken={this.props.updateToken} />
                        }

                        <Button
                            sx={{
                                color: 'black'
                            }}
                            onClick={(e) => this.toggleFunction()} >
                            {this.state.authToggle ? "Already have an account? Login"
                                : "Don't have an account? Sign Up"}
                        </Button>

                    </Box>
                </Grid>
            </Grid>

        )
    }

}