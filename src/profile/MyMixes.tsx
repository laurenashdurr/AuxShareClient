import React from 'react'

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
            myTracks: []
        }
    }

    fetchMixes = () => {
        fetch('http://localhost:3000/mixes/mine', {
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
        fetch(`http://localhost:3000/mixes/delete/${mix.id}`, {
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

        fetch(`http://localhost:3000/mixes/edit/${mix.id}`, {
            method: 'PUT',
            body: JSON.stringify({ mix: { mixName: this.state.mixName, category: this.state.category, imageUrl: this.state.imageUrl, description: this.state.description } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.fetchMixes())

    };
    
    editMixToggle = (mix: Mix) => {
       
        return (
            <div>   
                 
                 <button onClick={(e) => this.setState({ showEdit: false })}>Nevermind</button>
                 <form onSubmit={(e) => this.editMix(e, mix)}>
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
        )
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


    async componentDidMount() {

        this.fetchMixes()
    }

    render() {
        return (
            <div>
                <h1>My Mixes</h1>

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
                            <button onClick={(e) => this.setState({ showEdit: true })}>Edit Mix</button>
                            <button onClick={(e) => this.deleteMix(mix)}>Delete Mix</button>
                            {this.state.showEdit === true ? this.editMixToggle(mix)
                                : null}
                            {/* <button>Show Tracks</button> */}
                            {console.log("logged:",this.state.myTracks)}
                            <hr></hr>
                        </div>

                    )
                })}
            </div>
        )
    }

}

