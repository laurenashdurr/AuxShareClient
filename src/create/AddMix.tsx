import React from 'react'

import APIURL from '../helpers/environment'

import { Typography, Button, Grid, Card, CardContent, Avatar, CardHeader, TextField, Select, MenuItem, InputLabel } from '@mui/material';

import { AddTracks } from "./AddTracks"

type AddMixProps = {
    token: string
}

type AddMixState = {
    mixName: string,
    category: string,
    imageUrl: string,
    description: string,
    mixCreate: boolean,
    createdMix: {
        mix: {
            mixName: string,
            category: string,
            imageUrl: string,
            description: string
            UserId: number,
            id: number
        }
    }
}



export class AddMix extends React.Component<AddMixProps, AddMixState> {

    constructor(props: AddMixProps) {
        super(props)
        this.state = {
            mixName: '',
            category: '',
            imageUrl: '',
            description: '',
            mixCreate: false,
            createdMix: {
                mix: {
                    mixName: '',
                    category: '',
                    imageUrl: '',
                    description: '',
                    UserId: 1,
                    id: 1
                }
            }
        }
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        this.setState({ mixCreate: true });
        e.preventDefault();
        fetch(`${APIURL}/mixes/`, {
            method: 'POST',
            body: JSON.stringify({ mix: { mixName: this.state.mixName, category: this.state.category, imageUrl: this.state.imageUrl, description: this.state.description } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(
            (response) => response.json()
        ).then((logData) => {
            this.setState({ createdMix: logData });
            console.log(logData)
        })
    }



    createMixToggle = () => {
        return (
            <div>
                <Typography
                    sx={{
                        paddingTop: 2,
                        paddingBottom: 2,
                        fontSize: 75,
                    }}
                    variant='h1'>
                    Create a Mix
                </Typography>

                <form style={{ textAlign: "center" }} onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <InputLabel id="simple-select-label"></InputLabel>
                        <Select labelId="simple-select-label"
                            id="simple-select"
                            label="Cateogry"
                            onChange={(e) => this.setState({ category: e.target.value })} name="category" value={this.state.category}>
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
                        variant="text" type="submit">MAKE IT HAPPEN</Button>
                </form>
            </div>

        )
    }

    showCreated = () => {
        return (
            <div>
                <Typography
                    sx={{
                        paddingTop: 2,
                        paddingBottom: 2,
                        fontSize: 75,
                        textAlign: "center"
                    }}
                    variant='h1'>
                    Mix Created
                </Typography>

                <Card sx={{ maxWidth: 340, color: "white", minHeight: 120, backgroundColor: '#6200EE', borderRadius: 10, marginBottom: 2, marginLeft: "auto", marginRight:"auto" }} >
                    <CardHeader sx={{ paddingBottom: 0, paddingTop: 1 }}
                        avatar={
                            <Avatar src={this.state.imageUrl} alt={"user chosen graphic of mix"} />
                        }
                        title={this.state.mixName + " • " + this.state.category}
                    />
                    <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
                        <Typography variant="body2">
                            {this.state.description}
                        </Typography>
                    </CardContent>
                </Card>


                <AddTracks token={this.props.token} mix={this.state.createdMix} />
            </div>
        )
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"

            >
                {this.state.mixCreate === false ? this.createMixToggle()
                    : this.showCreated()}
            </Grid>
        )
    }

}