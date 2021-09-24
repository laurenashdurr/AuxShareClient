import React from 'react'

import { Feed } from './Feed'

type HomeProps = {
    token: string
}

type HomeState = {
    mixes: [],
    showComp: boolean
}

type Mix = {
    mixName: string, 
    category: string,
    imageUrl: string,
    description: string
    UserId: number

}


export class Home extends React.Component<HomeProps, HomeState>{

    constructor(props: HomeProps) {
        super(props)
        this.state = {
            mixes: [],
            showComp: false
        }
    }

    fetchMixes = () => {
        fetch('http://localhost:3000/mixes/all', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((logData) => {
                this.setState({ mixes: logData });
                console.log(logData)
            })
    };


    async componentDidMount() {
        this.fetchMixes()
    }

    showComp = () => {
        console.log("it worked")
        this.setState({showComp: true})
    }


    render() {
        return (
            <div>
                <h1>DISCOVER</h1>
                    {this.state.mixes.map((mix: Mix, index) => {
                        return (
                            <div key={index}>
                                <img src={mix.imageUrl} alt={"user chosen graphic of mix"}/>
                                <div>
                                {mix.mixName}
                                </div>
                                <div>
                                {mix.description}
                                </div>
                                <button onClick={this.showComp}>See Tracks</button>
                                {this.state.showComp ? <Feed />
                                : null}
                                <hr></hr>
                            </div>
                            
                        )
                    })}

            </div>
        )
    }

}

// Discover header
// add mix button 
// buttons for the different categories that can be displayed. some sort of ternaries to change what gets passed into the feed


// feed map



// footer