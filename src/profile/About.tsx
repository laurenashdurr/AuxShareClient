// if there is no profile, show the create profile button and add a form that takes in the info. Ternary? 
// upon update, "refresh" and display the profile 

import React from 'react'

type AboutProps = {
    token: string
}

type AboutState = {
    profile: Profile
}

type Profile = {
    fullName: string,
    avatarUrl: string,
    bio: string
}

export class About extends React.Component<AboutProps, AboutState>{

    constructor(props: AboutProps) {
        super(props)
        this.state = {
            profile: {
                fullName: "",
                avatarUrl: "",
                bio: ""
            }
        }
    }

    fetchProfile = () => {
        fetch('http://localhost:3000/profile/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((logData) => {
                this.setState({ profile: logData });
                console.log(logData)
            })
    };


    async componentDidMount() {
        this.fetchProfile()
    }

    showProfile = () => {
        return (
            <div>
                <img src={this.state.profile.avatarUrl} alt="the user profile" />
                <p>Full Name: {this.state.profile.fullName}</p>
                <p>Bio: {this.state.profile.bio}</p>
            </div>

        )
    }

    noProfile = () => {
        return (
            <div>
                <p>Create a profile!</p>
            </div>

        )
    }

    // if profile.fullname has value, show this map, if not, show this form to create a profile? 

    render() {
        return (
            <div>
                {this.state.profile === null ? this.noProfile()
                    : this.showProfile()}
            </div>
        )
    }

}