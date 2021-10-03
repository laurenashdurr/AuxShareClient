import React from 'react'

import APIURL from '../helpers/environment'


import { Typography, Button, Grid, Chip, Stack, Card, CardContent, Avatar, CardHeader } from '@mui/material';

type AboutProps = {
    token: string
}

type AboutState = {
    profile: Profile,
    fullName: string,
    avatarUrl: string,
    bio: string,
    showEdit: boolean

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
            },
            fullName: '',
            avatarUrl: "",
            bio: "",
            showEdit: false


        }
    }

    fetchProfile = () => {
        fetch(`${APIURL}/profile/`, {
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

    createProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${APIURL}/profile/`, {
            method: 'POST',
            body: JSON.stringify({ profile: { fullName: this.state.fullName, avatarUrl: this.state.avatarUrl, bio: this.state.bio } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.fetchProfile())

    }

    deleteProfile = () => {
        fetch(`${APIURL}/profile/delete`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then(() => this.fetchProfile())
    };

    editProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        this.setState({ showEdit: false })

        fetch(`${APIURL}/profile/edit`, {
            method: 'PUT',
            body: JSON.stringify({ profile: { fullName: this.state.fullName, avatarUrl: this.state.avatarUrl, bio: this.state.bio } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.fetchProfile())

    };

    editProfileToggle = () => {
        return (
            <div>

                <button onClick={(e) => this.setState({ showEdit: false })}>Nevermind</button>
                <form onSubmit={(e) => this.editProfile(e)}>
                    <div>
                        <label htmlFor="mixName">Full Name</label>
                        <input onChange={(e) => this.setState({ fullName: e.target.value })} name="fullname" value={this.state.fullName} />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">Image</label>
                        <input onChange={(e) => this.setState({ avatarUrl: e.target.value })} name="avatarUrl" value={this.state.avatarUrl} />
                    </div>
                    <div>
                        <label htmlFor="description">Bio</label>
                        <input onChange={(e) => this.setState({ bio: e.target.value })} name="bio" value={this.state.bio} />
                    </div>
                    <button type="submit">Update</button>
                </form>

            </div>
        )

    }



    async componentDidMount() {
        this.fetchProfile()
    }

    showProfile = () => {
        return (
            <div>
                {this.state.showEdit === true ? this.editProfileToggle()
                    : null}
                <img src={this.state.profile.avatarUrl} alt="the user profile" />
                <p>Full Name: {this.state.profile.fullName}</p>
                <p>Bio: {this.state.profile.bio}</p>

                <button onClick={(e) => this.setState({ showEdit: true })}>Edit Profile</button>
                <button onClick={(e) => this.deleteProfile()}>Delete Your Profile</button>

            </div>

        )
    }

    noProfile = () => {
        return (
            <div>
                <p>You currently don't have a profile, Create one!</p>
                <form onSubmit={(e) => this.createProfile(e)}>
                    <div>
                        <label htmlFor="mixName">Full Name</label>
                        <input onChange={(e) => this.setState({ fullName: e.target.value })} name="fullname" value={this.state.fullName} />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">Image</label>
                        <input onChange={(e) => this.setState({ avatarUrl: e.target.value })} name="avatarUrl" value={this.state.avatarUrl} />
                    </div>
                    <div>
                        <label htmlFor="description">Bio</label>
                        <input onChange={(e) => this.setState({ bio: e.target.value })} name="bio" value={this.state.bio} />
                    </div>
                    <button type="submit">Create Profile</button>
                </form>
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
               <Typography
                    sx={{

                        paddingTop: 2,
                        paddingBottom: 2,
                        fontSize: 75,
                    }}
                    variant='h1'>
                    Profile
                </Typography>

                {this.state.profile === null ? this.noProfile()
                    : this.showProfile()}
            </Grid>
        )
    }

}