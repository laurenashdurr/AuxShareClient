import React from 'react'

import APIURL from '../helpers/environment'

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
            <div>
                <h1>My Mixes</h1>

                {this.state.showEdit === true ? <div>
                    <button onClick={(e) => this.setState({ showEdit: false })}>Nevermind</button>
                    <form onSubmit={(e) => this.editMix(e, { mixName: this.state.mixName, category: this.state.category, imageUrl: this.state.imageUrl, description: this.state.description, UserId: this.state.UserId, id: this.state.id })}>
                        <div>
                            <label htmlFor="mixName">Name</label>
                            <input onChange={(e) => this.setState({ mixName: e.target.value })} name="mixname" value={this.state.mixName} />
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <select onChange={(e) => this.setState({ category: e.target.value })} name="category" value={this.state.category}>
                                <option value="mood1">Mood 1</option>
                                <option value="mood2">Mood 2</option>
                                <option value="mood3">Mood 3</option>
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
                        <button type="submit">Save</button>
                    </form>
                </div>
                    : null}

                {this.state.trackToggle ? <Feed tracks={this.state.myTracks} />
                    : null}

                {this.state.myMixes.map((mix: Mix, index) => {

                    return (
                        <div key={index}>
                            <img src={mix.imageUrl} alt={"user chosen graphic of mix"} />
                            <div>
                                {mix.mixName}
                            </div>
                            <div>
                                {mix.category}
                            </div>
                            <div>
                                {mix.description}
                            </div>
                            <button onClick={(e) => {
                                this.editMixToggle(mix);
                                this.setState({ showEdit: true, currentMix: mix })
                            }}>Edit Mix</button>
                            <button onClick={(e) => this.deleteMix(mix)}>Delete Mix</button>
                            <button onClick={() => {
                                this.toggleFunction()
                                this.fetchTracks(mix)
                            }}
                            >{this.state.trackToggle ? "Hide the Mix"
                            : "Peep the Mix"}</button>
                            <hr></hr>
                        </div>

                    )
                })}

            </div>
        )
    }

}

