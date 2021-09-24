// maps across all created mixes. 

// upon clicking each mix. The "display mix page" appears

import React from 'react'

type MmProps = {
    token: string
}

type MmState = {
    myMixes: []

}

type Mix = {
    mixName: string, 
    category: string,
    imageUrl: string,
    description: string
    UserId: number

}


export class MyMixes extends React.Component <MmProps, MmState> {

    constructor(props: MmProps) {
        super(props)
        this.state = {
            myMixes: []
        }
    }

    fetchMixes = () => {
        fetch('http://localhost:3000/mixes/mine', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((logData) => {
                this.setState({ myMixes: logData });
                console.log(logData)
            })
    };


    async componentDidMount() {
        this.fetchMixes()
    }

// same as about page, if myMixes === null, direct them to create a mix


    render() {
        return(
            <div>
                <h1>My Mixes</h1>

                {this.state.myMixes.map((mix: Mix, index) => {
                        return (
                            <div key={index}>
                                <img src={mix.imageUrl} alt={"user chosen graphic of mix"}/>
                                <div>
                                {mix.mixName}
                                </div>
                                <div>
                                {mix.description}
                                </div>
                                <button>Check it out</button>
                                <hr></hr>
                            </div>
                            
                        )
                    })}
            </div>
        )
    }

}