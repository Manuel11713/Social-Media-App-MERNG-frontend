import React from 'react';

import {Button, Grid, Typography} from '@material-ui/core';
import {Link    } from 'react-router-dom';
import imgHome from './assets/social-media.png';
import BarLoginRegister from './Components/BarLoginRegister/BarLoginRegister';

import './Home.css';

const Home = () => {
    return(
        <>
        <BarLoginRegister/>

        <div className="container-home">
            <Grid className='grid-home' container>
                <Grid className="register-home" item xs={12} md={6}>
                    <Typography variant="h2" gutterBottom>
                        Are you new here?
                    </Typography>
                    
                    <Typography variant="h3">
                        you can register here.
                    </Typography>
                    <Link className="link-to-register" to="/register">
                        <Button style={{width:'95%'}} variant="contained" color="primary">
                            Register
                        </Button>
                    </Link>
                    
                </Grid>
                <Grid item xs={12} md={6}>
                    <img className="img-home" src={imgHome} alt="img-home"/>
                </Grid>
            </Grid>
        </div>
        </>
    );
}

export default Home;