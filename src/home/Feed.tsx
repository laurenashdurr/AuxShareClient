
import React from 'react'

import { Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

type FeedProps = {
    tracks: []
}

type Track = {
    title: string,
    artist: string,
    note: string
}


export class Feed extends React.Component<FeedProps, {}> {
    render() {
        return (

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
                        {this.props.tracks.map((track: Track, index) => (
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
        )
    }

}