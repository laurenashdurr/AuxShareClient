import React from 'react'

import APIURL from '../helpers/environment'

import { Typography, Button, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

type AddTracksProps = {
    token: string,
    mix: {
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

type AddTracksState = {
    title: string,
    artist: string,
    note: string, 
    myTracks: []
}

type Mix = {
    mixName: string,
    category: string,
    imageUrl: string,
    description: string
    UserId: number,
    id: number
}

type Track = {
    title: string,
    artist: string,
    note: string
}


export class AddTracks extends React.Component<AddTracksProps, AddTracksState>{
    constructor(props: AddTracksProps) {
        super(props)
        this.state = {
            title: '',
            artist: '',
            note: '',
            myTracks: []
        }
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

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>, mix: Mix) => {
        e.preventDefault();
        fetch(`${APIURL}/tracks/${mix.id}`, {
            method: 'POST',
            body: JSON.stringify({ track: { title: this.state.title, artist: this.state.artist, note: this.state.note } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((data) => {
                console.log("console", data)
            }).then(() => this.fetchTracks(mix))
    };


    render() {
        return (
            <div>
                 <Typography
                    sx={{
                        paddingTop: 2,
                        paddingBottom: 2,
                        fontSize: 75,
                    }}
                    variant='h1'>
                    Add Some Tracks
                </Typography>

                <form style={{textAlign:"center"}} onSubmit={(e) => this.handleSubmit(e, this.props.mix.mix)}>
                    <div>
                        <TextField required variant="outlined" id="outlined-size-normal" label="Track Name" defaultValue="Track Name" onChange={(e) => this.setState({ title: e.target.value })} name="title" value={this.state.title} />
                    </div>
                    <div>
                        <TextField required variant="outlined" id="outlined-size-normal" label="Artist" defaultValue="Artist" onChange={(e) => this.setState({ artist: e.target.value })} name="artist" value={this.state.artist} />
                    </div>
                    <div>
                        <TextField variant="outlined" id="outlined-size-normal" label="Track Note" defaultValue="Track Note" onChange={(e) => this.setState({ note: e.target.value })} name="note" value={this.state.note} />
                    </div>
                    <Button sx={{
                        color: '#6200EE',
                        paddingBottom: 2
                    }}
                        variant="text" type="submit">ADD IT TO THE MIX</Button>
                </form>

                <TableContainer >
                    <Table sx={{  minWidth: 350, marginRight: "auto", marginLeft: "auto"}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Song</TableCell>
                                <TableCell align="center">Artist</TableCell>
                                <TableCell align="center">Track Note</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.myTracks.map((track: Track, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {track.title}
                                    </TableCell>
                                    <TableCell align="center">{track.artist}</TableCell>
                                    <TableCell align="center">{track.note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
{/* 
                {this.state.myTracks.map((track: Track, index) => {

                    return (
                        <div key={index}>
                            <div>
                                {track.title}
                            </div>
                            <div>
                                {track.artist}
                            </div>
                            <div>
                                {track.note}
                            </div>
                        </div>

                    )
                })} */}

                
            </div >
        )
    }

}