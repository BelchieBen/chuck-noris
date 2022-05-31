import React, {useState} from 'react';
import {List, ListItemButton, ListItemText} from '@mui/material';
import axios from 'axios';
import {jokeFromCategory} from '../utils/endpoints.ts';

export default function(props){
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleListItemClick = (
        event : React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        axios.get(jokeFromCategory+event.target.innerHTML)
            .then((res) => {
                console.log(res);
                props.setRandomJoke(res.data);
            })
    }

    return(
        <List style={{maxHeight: '200px', overflow: 'auto'}}>
            {props.categories.map((category, i) => {
                return(
                    <ListItemButton
                        key={i}
                        selected={selectedIndex === i}
                        onClick={(e) => handleListItemClick(e,i)}>
                        
                        <ListItemText primary={category}/>
        
                    </ListItemButton>
                )
            })}
        </List>
    )
}