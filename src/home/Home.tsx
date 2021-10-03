import React from 'react'

import APIURL from '../helpers/environment'

import { Feed } from './Feed'

import { Typography, Box, Grid, Chip, Stack, Card, CardContent, Avatar, Container, CardHeader, IconButton, Paper } from '@mui/material';

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

              
                    {this.state.trackToggle ? <Feed tracks={this.state.myTracks} />
                        : null}

                {/* test code */}
                <Card sx={{ minWidth: 350, maxWidth: 350, color: "white", minHeight: 150, maxHeight: 200, backgroundColor: '#6200EE', borderRadius: 10, marginBottom: 2}} >
                <CardHeader sx={{ paddingBottom: 0, paddingTop: 1 }}
                avatar={
                <Avatar src="https://assets3.thrillist.com/v1/image/2726470/1200x630/flatten;crop_down;jpeg_quality=70" />
            }
                title="title"
                action={
                <IconButton aria-label="settings"
                >
                <UnfoldMoreRoundedIcon sx={{ color: "white" }} />
                </IconButton>
            }
                />
                <CardContent sx={{ paddingTop: 0, paddingBottom: 1 }}>
                <Typography variant="body2">
                this is a fake description I really love this mix and all the descriptions should really be this long to help the length
                </Typography>
                </CardContent>

                </Card>

                <Card sx={{ minWidth: 350, maxWidth: 350, color: "white", minHeight: 150, maxHeight: 200, backgroundColor: '#6200EE', borderRadius: 10, marginBottom: 2}} >
                <CardHeader sx={{ paddingBottom: 0, paddingTop: 1 }}
                avatar={
                <Avatar src="https://assets3.thrillist.com/v1/image/2726470/1200x630/flatten;crop_down;jpeg_quality=70" />
            }
                title="title"
                action={
                <IconButton aria-label="settings"
                >
                <UnfoldMoreRoundedIcon sx={{ color: "white" }} />
                </IconButton>
            }
                />
                <CardContent sx={{ paddingTop: 0, paddingBottom: 1 }}>
                <Typography variant="body2">
                this is a fake description I really love this mix and all the
                </Typography>
                </CardContent>
                </Card>

            {/* test code  */}

            {this.state.mixes.map((mix: Mix, index) => {
                return (
                <div key={index}>
                <Card sx={{ minWidth: 300, maxWidth: 500, color: "white", maxHeight: 300, backgroundColor: '#6200EE', borderRadius: 10, paddingBottom: 2 }} >
                <CardHeader sx={{ paddingBottom: 1, paddingTop: 1 }}
                avatar={
                <Avatar src={mix.imageUrl} alt={"user chosen graphic of mix"} />
            }
                title={mix.mixName}
                subheader={mix.category}
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
                <Typography variant="body1">
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

