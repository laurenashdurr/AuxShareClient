import React from 'react'

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

        }
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        this.setState({mixCreate: true});
        e.preventDefault();
        fetch('http://localhost:3000/mixes/', {
            method: 'POST',
            body: JSON.stringify({ mix: { mixName: this.state.mixName, category: this.state.category, imageUrl: this.state.imageUrl, description: this.state.description } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(
            (response) => response.json()
        ).then((logData) => {
            console.log(logData)
        })

    }

    createMixToggle = () => {
        return (
            <div>
            <h1>Create a Mix!</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
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
                <button type="submit">Render</button>
            </form>
        </div>

        )
    }

    showCreated = () => {
        return (
            <div>
                <h1>Mix Created! Now, Add Some Tracks.</h1>
                {this.state.mixName}
                {this.state.category}
                <AddTracks token={this.props.token}/>
            </div>
        )
    }

    render() {
        return (
            <div>
               {this.state.mixCreate === false ? this.createMixToggle()
                    : this.showCreated()} 
            </div>
        )
    }

}