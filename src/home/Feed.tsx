
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
            // <div>
            //     {this.props.tracks.map((track: Track, index) => {

            //         return (
            //             <div key={index}>
            //                 <div>
            //                     {track.title}
            //                 </div>
            //                 <div>
            //                     {track.artist}
            //                 </div>
            //                 <div>
            //                     {track.note}
            //                 </div>
            //             </div>

            //         )
            //     })}

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Song</TableCell>
                                <TableCell>Artist</TableCell>
                                <TableCell>Mix Note</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.props.tracks.map((track: Track, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {track.title}
                                    </TableCell>
                                    <TableCell>{track.artist}</TableCell>
                                    <TableCell>{track.note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            // </div>
        )
    }

}