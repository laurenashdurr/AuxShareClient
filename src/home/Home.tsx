import React from 'react'

import APIURL from '../helpers/environment'

import { Feed } from './Feed'

import { Typography, Box, Grid, Chip, Stack, Card, CardContent, Avatar, Container, CardHeader, IconButton } from '@mui/material';

import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';


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
        fetch(`${APIURL}/mixes/mood1`, {
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
        fetch(`${APIURL}/mixes/mood2`, {
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
        fetch(`${APIURL}/mixes/mood3`, {
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

                        paddingTop: 5,
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
                    }} label="Mood 1" onClick={this.fetchMixesMood1} />
                    <Chip sx={{
                        backgroundColor: '#6200EE',
                        color: "white"
                    }} label="Mood 2" onClick={this.fetchMixesMood2} />
                    <Chip sx={{
                        backgroundColor: '#6200EE',
                        color: "white"
                    }} label="Mood 3" onClick={this.fetchMixesMood3} />
                </Stack>

                <Box>
                    {this.state.trackToggle ? <Feed tracks={this.state.myTracks} />
                        : null}
                </Box>

                {/* //test code  */}
                {/* 
                <Card sx={{ minWidth: 300, color: "white", maxHeight: 300, backgroundColor: '#6200EE', borderRadius: 10 }} >
                    <CardHeader sx={{ paddingBottom: 1, paddingTop: 1 }}
                        avatar={
                            <Avatar src="https://i.pinimg.com/originals/db/93/b6/db93b60c27d746223a07988e5f4872b0.jpg" />
                        }
                        title="Name of the mix · Type"
                        action={
                            <IconButton aria-label="settings">
                                <UnfoldMoreRoundedIcon sx={{ color: "white" }} />
                            </IconButton>
                        }
                    />
                    <CardContent sx={{ paddingTop: 1, paddingBottom: 1 }}>
                        <Typography variant="body2">
                            This is the description of the mix and all the content that goes with it.This is the description of the mix and all the content that goes.This is the description of the mix and all the content that goes with it
                        </Typography>
                    </CardContent>
                </Card> */}

                {/* //test code end */}

                {this.state.mixes.map((mix: Mix, index) => {
                    return (
                        <div key={index}>
                            <Card sx={{ minWidth: 300, color: "white", maxHeight: 300, backgroundColor: '#6200EE', borderRadius: 10 }} >
                                <CardHeader sx={{ paddingBottom: 1, paddingTop: 1 }}
                                    avatar={
                                        <Avatar src={mix.imageUrl} alt={"user chosen graphic of mix"} />
                                    }
                                    title={mix.mixName}
                                    action={
                                        <IconButton aria-label="settings" onClick={(e) => {
                                            this.toggleFunction()
                                            this.fetchTracks(mix)
                                        }}>
                                            <UnfoldMoreRoundedIcon sx={{ color: "white" }} />
                                        </IconButton>
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

