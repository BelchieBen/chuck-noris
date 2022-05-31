import React, {useState} from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

export default function JokeCard(props){
    return(
        <Paper elevation={2} sx={{padding:4, textAlign:"center", marginTop:4}}>
            <Typography variant="h4">Your Joke: </Typography>
            <Divider orientation="horizontal" sx={{margin:2}}/>
            <Typography variant="h5">"{props.joke.value}"</Typography>
        </Paper>
    )
}