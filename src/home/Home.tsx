import React from 'react'

import { Feed } from './Feed'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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

    fetchMixesMood1 = () => {
        fetch('http://localhost:3000/mixes/mood1', {
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

    fetchMixesMood2 = () => {
        fetch('http://localhost:3000/mixes/mood2', {
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

    fetchMixesMood3 = () => {
        fetch('http://localhost:3000/mixes/mood3', {
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


    toggleFunction = () => {
        this.setState({ trackToggle: !this.state.trackToggle })

    }

    render() {
        return (
            <div>
                <h1>DISCOVER</h1>
            
                <Stack direction="row" spacing={1}>
                    <Chip label="All Mixes" color="primary" onClick={this.fetchMixes}/>
                    <Chip label="Mood 1"onClick={this.fetchMixesMood1}/>
                    <Chip label="Mood 2" onClick={this.fetchMixesMood2}/>
                    <Chip label="Mood 3" onClick={this.fetchMixesMood3}/>
                </Stack>
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

