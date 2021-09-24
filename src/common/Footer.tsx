import React from 'react'

import { BrowserRouter, Switch, Route, Link} from "react-router-dom";
import { Home } from '../home'
import { Favorites } from '../favorites';
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

                <Route path="/favorites" exact>
                    <Favorites/>
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
                        <Link to='/favorites'>Favorites</Link>
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