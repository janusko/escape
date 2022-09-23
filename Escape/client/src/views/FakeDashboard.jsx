// import Typewriter from 'typewriter-effect/dist/core';
import { Typewriter } from 'react-simple-typewriter';
import React from 'react'
import '../styles/FakeDashboard.css'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseIcon from '@mui/icons-material/Pause';
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";



export default () => {
    const navigate = useNavigate();

    let audio = new Audio('/dash_music.mp3');

    const start = () => { audio.play() }
    const pause = () => { audio.pause() }

    return (
        <div className='Container'>
        <img className='airbnbDashboard' src='/img/airbnb_dash2.png' alt='airbnbDashboard'/>
        <div className='background'>
        <div className='typeWriter_container'>
        <Typewriter
            loop
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
            words={['Tired of staying in the most common places? Dreaming of a cave in the depths of India or a private Island in the Pacific? Will you be bold enough to switch to the hidden size?']}
        />
        <Button variant="outlined" onClick ={ () => navigate('/home')}>Jump In The Hidden Side</Button>
        </div>
        <button onClick={start} className="play"><PlayCircleOutlineIcon sx={{ fontSize: 50}}/></button>
        <button onClick={pause} className="pause"><PauseIcon sx={{ fontSize: 50}}/></button>
        </div>
        </div>
    )

}