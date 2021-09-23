// Discover header
// add mix button 
// buttons for the different categories that can be displayed. some sort of ternaries to change what gets passed into the feed


// feed map



// footer

import React from 'react'

type HomeProps = {
    clearToken: Function
}

export class Home extends React.Component <HomeProps, {}>{
    render() {
        return(
            <div>
                This is the Home component

                <button onClick={(e) => this.props.clearToken()}>Logout</button>
            </div>
        )
    }

}