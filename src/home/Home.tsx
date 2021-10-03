import React from 'react'

import APIURL from '../helpers/environment'

import { Feed } from './Feed'

import { Typography, Button, Grid, Chip, Stack, Card, CardContent, Avatar, CardHeader } from '@mui/material';




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
        fetch(`${APIURL}/mixes/all`, {
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
        fetch(`${APIURL}/tracks/${mix.id}`, {
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
        fetch(`${APIURL}/mixes/Hype`, {
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
        fetch(`${APIURL}/mixes/Vibe`, {
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
        fetch(`${APIURL}/mixes/IMF`, {
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
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"

            >
                <Typography
                    sx={{

                        paddingTop: 2,
                        paddingBottom: 2,
                        fontSize: 75,
                    }}
                    variant='h1'>
                    DISCOVER
                </Typography>

                <Stack sx={{
                    paddingBottom: 2,
                }} direction="row" spacing={2}>
                    <Chip sx={{
                        backgroundColor: '#6200EE80',
                        color: "white"
                    }} label="All Mixes" onClick={this.fetchMixes} />
                    <Chip sx={{
                        backgroundColor: '#6200EE',
                        color: "white"
                    }} label="Hype" onClick={this.fetchMixesMood1} />
                    <Chip sx={{
                        backgroundColor: '#6200EE',
                        color: "white"
                    }} label="My Feelings" onClick={this.fetchMixesMood3} />
                    <Chip sx={{
                        backgroundColor: '#6200EE',
                        color: "white"
                    }} label="A Vibe" onClick={this.fetchMixesMood2} />
                </Stack>

                {this.state.trackToggle ? <Feed tracks={this.state.myTracks} />
                    : null}

                {this.state.mixes.map((mix: Mix, index) => {
                    return (
                        <div key={index}>
                            <Card sx={{ minWidth: 330, maxWidth: 330, color: "white", minHeight: 120, maxHeight: 120, backgroundColor: '#6200EE', borderRadius: 10, marginBottom: 2 }} >
                                <CardHeader sx={{ paddingBottom: 0, paddingTop: 1 }}
                                    avatar={
                                        <Avatar src={mix.imageUrl} alt={"user chosen graphic of mix"} />
                                    }
                                    title={mix.mixName + " • " + mix.category}
                                    action={
                                        <Button sx={{ color: "white" }} aria-label="settings" onClick={(e) => {
                                            this.toggleFunction()
                                            this.fetchTracks(mix)
                                        }}>
                                            {this.state.trackToggle ? "Hide the Mix"
                                                : "Peep the Mix"}</Button>
                                    }
                                />
                                <CardContent sx={{ paddingTop: 1, paddingBottom: 1 }}>
                                    <Typography variant="body2">
                                        {mix.description}
                                    </Typography>
                                   
                                </CardContent>
                            </Card>
                        </div>


                    )
                })}
            </Grid>
        )
    }

}

