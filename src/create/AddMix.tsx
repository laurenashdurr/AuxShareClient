import React from 'react'

import APIURL from '../helpers/environment'

import { Typography, Button, Grid, Chip, Stack, Card, CardContent, Avatar, CardHeader } from '@mui/material';

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
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="mixName">Name</label>
                        <input onChange={(e) => this.setState({ mixName: e.target.value })} name="mixname" value={this.state.mixName} />
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select onChange={(e) => this.setState({ category: e.target.value })} name="category" value={this.state.category}>
                            <option disabled> </option>
                            <option value="Hype">Hype</option>
                            <option value="Vibe">A Vibe</option>
                            <option value="IMF">In My Feelings</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="imageUrl">Image</label>
                        <input onChange={(e) => this.setState({ imageUrl: e.target.value })} name="imageUrl" value={this.state.imageUrl} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input onChange={(e) => this.setState({ description: e.target.value })} name="description" value={this.state.description} />
                    </div>
                    <button type="submit">Render</button>
                </form>
            </div>

        )
    }

    showCreated = () => {
        return (
            <div>
                <Card sx={{ minWidth: 330, color: "white", minHeight: 100, backgroundColor: '#6200EE', borderRadius: 10, marginBottom: 2 }} >
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