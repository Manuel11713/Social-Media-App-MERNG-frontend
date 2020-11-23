import React from 'react';

import HeaderBar from '../../Components/HeaderBar/HeaderBar';

import InfoUser from './Components/InfoUser/InfoUser';
import PostsUser from './Components/PostsUser/PostsUser';
import ADC from './Components/AddDeleteContact/ADC';

import {Grid} from '@material-ui/core';

const Profile = () => {

    return(
        <>
            <HeaderBar/>
            <main>
                <Grid container>
                    <Grid xs={4} item style={{padding:40}}>
                        <InfoUser/>
                        <ADC/>
                    </Grid>
                    <Grid xs={6} item>
                        <PostsUser/>
                    </Grid>
                    <Grid xs={2} item>
                    </Grid>
                </Grid>
            </main>
        </>
    );
}


export default Profile;