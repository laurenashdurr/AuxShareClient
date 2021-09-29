
import React from 'react'

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
            <div>
                {this.props.tracks.map((track: Track, index) => {

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
                })}
            </div>
        )
    }

}