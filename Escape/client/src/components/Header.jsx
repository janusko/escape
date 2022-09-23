import React, {useEffect, useState} from 'react'
import '../styles/header.css'
import {Link, useNavigate, useParams} from 'react-router-dom';
import SearchBannerContainer from '../components/SearchBannerContainer';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import axios from "axios"

export default (props) => {
    const {setEndDateInResults, setStartDateInResults} = props
    const navigate = useNavigate();
    const [hostId, setHostId] = useState("")

    const logoutHandler = ()=>{
        axios.get(`http://localhost:8000/api/airbnb/user/logout`, {withCredentials: true})
            .then(res=>navigate("/home"))
            .catch()
    }

    const logoutHandlerHost = ()=>{
        axios.get(`http://localhost:8000/api/airbnb/host/logout`, {withCredentials: true})
        
            .then(res=>{
                setHostId("")
                navigate("/home")
            })
            .catch()
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getHost/`, {withCredentials: true})
        .then( res => {
            setHostId(res.data._id)
        })
        .catch(err => console.log(err))
    }, [])

    const setNewStartDate = (date) => {
        console.log("random thing")
        props.setStartDateInResults(date)
    }
    const setNewEndDate = (date) => {
        props.setEndDateInResults(date)
    }

    return (
        <div className="header">
            <Link to="/home">
            <img className='header_icon' src="/img/escape_logo.png" alt="airbnb_logo"/>
            </Link>

            <div className='header_right'>
                {!hostId ?
                <div className='registration'>
                <Button onClick={() => navigate('/register/host')} varriant='outlined' >Become an Escaper</Button> 

                <Button onClick={() => navigate(`/login/host/`)} varriant='outlined' >Login</Button> 

                <SearchIcon sx={{ color: "#972e79", fontSize:40}}/>

                </div>
                :
                <div className='registration'>
                <Button onClick={() => navigate(`/dashboard/host/${hostId}`)} varriant='outlined' >Dashboard</Button> 

                <Button onClick={logoutHandlerHost} varriant='outlined' >Logout</Button>

                <SearchIcon sx={{ color: "#972e79", fontSize:40}}/>

                {/* <Button onClick={logoutHandler}>Logout User</Button> */}
                </div>
                }
            </div>
        </div>
    )
}

