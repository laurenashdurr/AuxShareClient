import React from 'react'

import { Feed } from './Feed'

type HomeProps = {
    token: string
}

type HomeState = {
    mixes: [],
    trackToggle: boolean,
    myTracks: [],
}

type Mix = {
    mixName: string,
    category: string,
    imageUrl: string,
    description: string
    UserId: number,
    id: number

}


export class Home extends React.Component<HomeProps, HomeState>{

    constructor(props: HomeProps) {
        super(props)
        this.state = {
            mixes: [],
            trackToggle: false,
            myTracks: [],
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

    fetchTracks = async (mix: Mix) => {
        fetch(`http://localhost:3000/tracks/${mix.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((data) => {
                this.setState({ myTracks: data });
                console.log("in the console", data)
            })
    };


    async componentDidMount() {
        this.fetchMixes()
    }


    toggleFunction = () => {
        this.setState({ trackToggle: !this.state.trackToggle })

    }

    render() {
        return (
            <div>
                <h1>DISCOVER</h1>
                <section>
                    <button>Category 1</button>
                    <button>Category 2</button>
                    <button>Category 3</button>
                </section>
                <div>
                {this.state.trackToggle ? <Feed tracks={this.state.myTracks} />
                    : null}
                </div>
                {this.state.mixes.map((mix: Mix, index) => {
                    return (
                        <div key={index}>
                            <img src={mix.imageUrl} alt={"user chosen graphic of mix"} />
                            <div>
                                {mix.mixName}
                            </div>
                            <div>
                                {mix.description}
                            </div>
                            <button onClick={(e) => {
                             this.toggleFunction()
                             this.fetchTracks(mix)
                            }}>{this.state.trackToggle ? "Hide the Mix"
                            : "Peep the Mix"}
                            </button>
                            <hr></hr>
                        </div>

                    )
                })}

            </div>
        )
    }

}

