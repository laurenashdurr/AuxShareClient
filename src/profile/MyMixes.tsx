import React from 'react'

import APIURL from '../helpers/environment'

import { Typography, Button, Grid, Card, CardContent, Avatar, CardHeader, TextField, Select, MenuItem, InputLabel } from '@mui/material';

import { Feed } from '../home'

type MmProps = {
    token: string
}

type MmState = {
    myMixes: [],
    showEdit: boolean,
    mixName: string,
    category: string,
    imageUrl: string,
    description: string,
    myTracks: [],
    currentMix: Mix,
    UserId: number,
    id: number,
    trackToggle: boolean

}

type Mix = {
    mixName: string,
    category: string,
    imageUrl: string,
    description: string
    UserId: number,
    id: number

}



export class MyMixes extends React.Component<MmProps, MmState> {

    constructor(props: MmProps) {
        super(props)
        this.state = {
            myMixes: [],
            mixName: '',
            category: '',
            imageUrl: '',
            description: '',
            showEdit: false,
            myTracks: [],
            UserId: 1,
            id: 1,
            currentMix: {
                mixName: '',
                category: '',
                imageUrl: '',
                description: '',
                UserId: 1,
                id: 1
            },
            trackToggle: false
        }
    }

    fetchMixes = () => {
        fetch(`${APIURL}/mixes/mine`, {
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



    deleteMix = (mix: Mix) => {
        fetch(`${APIURL}/mixes/delete/${mix.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then(() => this.fetchMixes())
    };


    editMix = async (e: React.FormEvent<HTMLFormElement>, mix: Mix) => {
        this.setState({ showEdit: false })

        fetch(`${APIURL}/mixes/edit/${mix.id}`, {
            method: 'PUT',
            body: JSON.stringify({ mix: { mixName: this.state.mixName, category: this.state.category, imageUrl: this.state.imageUrl, description: this.state.description } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.fetchMixes())

    };

    editMixToggle = (mix: Mix) => {

        this.setState({ mixName: mix.mixName, category: mix.category, imageUrl: mix.imageUrl, description: mix.description, UserId: mix.UserId, id: mix.id })
    }

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

    toggleFunction = () => {
        this.setState({ trackToggle: !this.state.trackToggle })

    }


    async componentDidMount() {

        this.fetchMixes()
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Typography
                    sx={{

                        paddingTop: 2,
                        paddingBottom: 2,
                    }}
                    variant='h2'>
                    My Mixes
                </Typography>

                {this.state.showEdit === true ? <div style={{ textAlign: "center" }}>
                    <Button sx={{
                        color: '#6200EE',
                        paddingBottom: 1
                    }} onClick={(e) => this.setState({ showEdit: false })}>Nevermind</Button>

                    <form style={{ textAlign: "center" }} onSubmit={(e) => this.editMix(e, { mixName: this.state.mixName, category: this.state.category, imageUrl: this.state.imageUrl, description: this.state.description, UserId: this.state.UserId, id: this.state.id })}>
                        <div>
                            <InputLabel id="simple-select-label"></InputLabel>
                            <Select labelId="simple-select-label"
                                id="simple-select"
                                label="Cateogry" onChange={(e) => this.setState({ category: e.target.value })} name="category" value={this.state.category}>
                                <MenuItem value="Hype">Hype</MenuItem>
                                <MenuItem value="Vibe">A Vibe</MenuItem>
                                <MenuItem value="IMF">In My Feelings</MenuItem>
                            </Select>
                        </div>
                        <div>
                            <TextField variant="outlined" id="outlined-size-normal" label="Mix Name" defaultValue="Mix Name" onChange={(e) => this.setState({ mixName: e.target.value })} name="mixname" value={this.state.mixName} />
                        </div>
                        <div>
                            <TextField variant="outlined" id="outlined-size-normal" label="Image URL" defaultValue="Image URL" onChange={(e) => this.setState({ imageUrl: e.target.value })} name="imageUrl" value={this.state.imageUrl} />
                        </div>
                        <div>
                            <TextField variant="outlined" id="outlined-size-normal" label="Description" defaultValue="Description" onChange={(e) => this.setState({ description: e.target.value })} name="description" value={this.state.description} />
                        </div>
                        <Button sx={{
                            color: '#6200EE',
                        }}
                            variant="text" type="submit">Save</Button>
                    </form>
                </div>
                    : null}

                {this.state.trackToggle ? <Feed tracks={this.state.myTracks} />
                    : null}

                {this.state.myMixes.map((mix: Mix, index) => {

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
                                        <Button sx={{ color: "white" }} onClick={(e) => {
                                            this.editMixToggle(mix);
                                            this.setState({ showEdit: true, currentMix: mix })
                                        }}>Edit Mix</Button>
                                        <Button sx={{ color: "white" }} onClick={(e) => this.deleteMix(mix)}>Delete Mix</Button>
                                    </CardContent>
                                </Card>
                            </div>

                    )
                })}

            </div>
        )
    }

}

