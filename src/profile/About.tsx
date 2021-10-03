import React from 'react'

import APIURL from '../helpers/environment'

import { Typography, Button, ButtonGroup, Box, Grid, Card, CardContent, Avatar, CardHeader, TextField, Select, MenuItem, InputLabel } from '@mui/material';

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
            <div style={{ textAlign: "center" }}>
                <Button sx={{
                    color: '#6200EE',
                    paddingBottom: 1
                }} onClick={(e) => this.setState({ showEdit: false })}>Nevermind</Button>
                <form style={{ textAlign: "center" }} onSubmit={(e) => this.editProfile(e)}>
                    <div>
                        <TextField required variant="outlined" id="outlined-size-normal" label="Full Name" defaultValue="Full Name" onChange={(e) => this.setState({ fullName: e.target.value })} name="fullname" value={this.state.fullName} />
                    </div>
                    <div>
                        <TextField variant="outlined" id="outlined-size-normal" label="Image" defaultValue="Image" onChange={(e) => this.setState({ avatarUrl: e.target.value })} name="avatarUrl" value={this.state.avatarUrl} />
                    </div>
                    <div>
                        <TextField variant="outlined" id="outlined-size-normal" label="Bio" defaultValue="Bio" onChange={(e) => this.setState({ bio: e.target.value })} name="bio" value={this.state.bio} />
                    </div>
                    <Button sx={{
                        color: '#6200EE',
                        paddingBottom: 1
                    }}
                        variant="text" type="submit">Update</Button>
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
                <Box
                    sx={{
                        minWidth: 300,
                        minHeight: 300,
                        maxWidth: 700,
                        maxHeight: 700,
                        bgcolor: '#6200EE',
                        borderRadius: 17,
                        textAlign: 'center',
                        color: "white",
                        alignContent: "center",
                        justifyContent: "center",
                        padding: 5
                    }}>
                    <img style={{ borderRadius: 50, maxHeight: 200, maxWidth: 200, paddingBottom: 2 }} src={this.state.profile.avatarUrl} alt="the user profile" />
                    <Typography sx={{fontSize: "1em"}} variant="h1" component="div">{this.state.profile.fullName}</Typography>
                    <Typography sx={{fontSize: "1em"}} variant="h2" component="div">{this.state.profile.bio}</Typography>
                        <Button sx={{
                            color: 'white',
                        }} onClick={(e) => this.setState({ showEdit: true })}>Edit Profile</Button>
                        <Button sx={{
                            color: 'white',
                        }} onClick={(e) => this.deleteProfile()}>Delete Profile</Button>

                </Box>

            </div>

        )
    }

    noProfile = () => {
        return (
            <div>
                <Typography variant="h3" component="div">You currently don't have a profile. Create one!</Typography>
                <form style={{ textAlign: "center" }} onSubmit={(e) => this.createProfile(e)}>
                    <div>
                        <TextField required variant="outlined" id="outlined-size-normal" label="Full Name" defaultValue="Full Name" onChange={(e) => this.setState({ fullName: e.target.value })} name="fullname" value={this.state.fullName} />
                    </div>
                    <div>
                        <TextField variant="outlined" id="outlined-size-normal" label="Image" defaultValue="Image" onChange={(e) => this.setState({ avatarUrl: e.target.value })} name="avatarUrl" value={this.state.avatarUrl} />
                    </div>
                    <div>
                        <TextField variant="outlined" id="outlined-size-normal" label="Bio" defaultValue="Bio" onChange={(e) => this.setState({ bio: e.target.value })} name="bio" value={this.state.bio} />
                    </div>
                    <Button sx={{
                        color: '#6200EE',
                        paddingTop: 1
                    }}
                        variant="text" type="submit">Create Profile</Button>
                </form>
            </div>

        )
    }


    render() {
        return (
            <div style={{ textAlign: "center" }}>
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
            </div>
        )
    }

}