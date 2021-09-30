import React from 'react'

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
        fetch(`http://localhost:3000/tracks/${mix.id}`, {
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
        fetch(`http://localhost:3000/tracks/${mix.id}`, {
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
                <h1>Add Tracks</h1>
                <form onSubmit={(e) => this.handleSubmit(e, this.props.mix.mix)}>
                    <div>
                        <label htmlFor="mixName">Song Title</label>
                        <input onChange={(e) => this.setState({ title: e.target.value })} name="title" value={this.state.title} />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">Artist</label>
                        <input onChange={(e) => this.setState({ artist: e.target.value })} name="artist" value={this.state.artist} />
                    </div>
                    <div>
                        <label htmlFor="description">Note</label>
                        <input onChange={(e) => this.setState({ note: e.target.value })} name="note" value={this.state.note} />
                    </div>
                    <button type="submit">Render</button>
                </form>

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
                })}

                
            </div >
        )
    }

}