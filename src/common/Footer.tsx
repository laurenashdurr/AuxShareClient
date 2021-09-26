import React from 'react'

import { BrowserRouter, Switch, Route, Link} from "react-router-dom";

import { AddMix } from '../create';
import { Home } from '../home'
import { Profile } from '../profile'


type FooterProps = {
    clearToken: Function,
    token: string
}


export class Footer extends React.Component <FooterProps,{} > {
    render() {
        return(
            <BrowserRouter>

            <Switch>
                <Route path="/" exact>
                    <Home token={this.props.token}/>
                </Route>

                <Route path="/mixes" exact>
                    <AddMix token={this.props.token}/>
                </Route>

                <Route path="/profile" exact>
                    <Profile clearToken={this.props.clearToken} token={this.props.token}/>
                </Route>
            </Switch>

            <footer>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/mixes'>+</Link>
                    </li>   
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                </ul>
            </footer>
            
        </BrowserRouter>
        )
    }

}