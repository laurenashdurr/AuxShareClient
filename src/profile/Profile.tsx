import React from 'react'
import { MyMixes } from './MyMixes'
import { About } from './About'

import { Button, Grid } from '@mui/material';


type ProfileProps = {
    clearToken: Function,
    token: string
}


export class Profile extends React.Component<ProfileProps, {}> {
    render() {
        return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <About token={this.props.token} />
                <Button sx={{
                    color: 'black',
                    paddingTop: 1
                }}
                    variant="text" type="submit" onClick={(e) => this.props.clearToken()}>LOGOUT</Button>
                <MyMixes token={this.props.token} />
            </Grid>
        )
    }

}

