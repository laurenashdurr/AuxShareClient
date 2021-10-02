import React from 'react'

import { BrowserRouter, Switch, Route } from "react-router-dom";

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';



import { AddMix } from '../create';
import { Home } from '../home'
import { Profile } from '../profile'


type FooterProps = {
    clearToken: Function,
    token: string
}


export class Footer extends React.Component<FooterProps, {}> {
    render() {
        return (
            <Box sx={{ pb: 7 }}>

                <BrowserRouter>

                    <Switch>
                        <Route path="/" exact>
                            <Home token={this.props.token} />
                        </Route>

                        <Route path="/mixes" exact>
                            <AddMix token={this.props.token} />
                        </Route>

                        <Route path="/profile" exact>
                            <Profile clearToken={this.props.clearToken} token={this.props.token} />
                        </Route>
                    </Switch>

                </BrowserRouter>

                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#6200EE' }} elevation={3}>

                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="Home" href="/" icon={<HomeRoundedIcon />} />
                        <BottomNavigationAction label="Create" href="/mixes" icon={<AddCircleRoundedIcon />} />
                        <BottomNavigationAction label="Profile" href="/profile" icon={<AccountCircleRoundedIcon />} />
                    </BottomNavigation>
                </Paper>


                </Box>



        )
    }

}