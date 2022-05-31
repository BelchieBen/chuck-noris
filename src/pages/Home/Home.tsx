import React, {useState} from 'react';
import {
    Box,
    Button,
    Typography,
    Stack,
    Paper,
    Divider,
    TextField
} from '@mui/material';
import axios from 'axios';
import {random, listCategories, freeSearchJoke} from '../../utils/endpoints.ts';
import JokeCard from '../../components/JokeCard.tsx';
import JokeCategoriesList from '../../components/JokeCategoriesList.tsx';

export default function Home(){
    const [randomJoke, setRandomJoke] = useState({});
    const [jokeCategories, setJokeCategories] = useState([]);
    const [freeSearch, setFreeSearch] = useState(false);
    const [freeSearchValue, setFreeSearchValue] = useState("");

    const handleRandomClicked = () => {
        axios.get(random)
            .then(res => {
                setRandomJoke(res.data);
            })
    }

    const handlePickCategoryClicked = () => {
        if(jokeCategories.length !== 0){
            setJokeCategories([]);
        } else{
            axios.get(listCategories)
                .then(res => {
                    setJokeCategories(res.data);
                })
        }
    }

    const handleFreeSearchClicked = () => {
        setFreeSearch(!freeSearch);
    }

    const handleSearchClicked = () => {
        axios.get(freeSearchJoke+freeSearchValue)
            .then((res) =>{
                if(res.data.result.length !== 0) {
                    let joke = res.data.result[Math.floor(Math.random()*res.data.result.length)];
                    setRandomJoke(joke);
                }
                console.log(res.data.result)
            })
    }

    return(
        <Box 
            sx={{
                display:"flex",
                flexDirection:"column",
                alignItems: "center",
                justifyContent: "center",
                marginTop:4
            }}>
            <Paper elevation={2} sx={{padding:4, textAlign:"center"}}>
                <Typography variant="h3">Random Chuck Norris Joke Generator</Typography>
                <Typography variant="h5">What would you like today?</Typography>
                <Divider orientation="horizontal" sx={{margin:2}}/>
                <Stack spacing={2}>
                    <Button variant="contained" onClick={handleRandomClicked}>Random Joke</Button>
                    <Button variant="contained" onClick={handlePickCategoryClicked}>Pick from a category</Button>
                    {jokeCategories.length !== 0 ? <JokeCategoriesList setRandomJoke={setRandomJoke} categories={jokeCategories} />: <></>}
                    <Button variant="contained" onClick={handleFreeSearchClicked}>Free Search</Button>
                    {freeSearch ? 
                        <Stack spacing={1} direction="row" sx={{width:"100%"}}>
                            <TextField 
                                color="secondary" 
                                label="Free Search" 
                                variant="outlined"
                                sx={{width:"100%"}}
                                onChange={(e) => {setFreeSearchValue(e.target.value)}} /> 
                            <Button variant="contained" color="secondary" onClick={handleSearchClicked}>Search</Button>
                        </Stack>
                    : 
                        <></>
                    }
                </Stack>
            </Paper>

            {Object.keys(randomJoke).length !== 0 ? <JokeCard joke={randomJoke} /> : <></> }
            
        </Box>
    )
}