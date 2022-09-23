import { Button } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from "axios"

export default () => {
    const navigate = useNavigate();
    // const [hostId, setHostId] = useState("")

    const [host, setHost] = useState({
        email: "",
        password: "",
        error: null
    })

    const changeHandler =(e) =>{
        let {name, value} = e.target
        setHost({
            ...host,
            [name] : value
        })
    }

    // const getHostId = () => {
    //     axios.get(`http://localhost:8000/api/getHost/`, {withCredentials: true})
    //     .then( res => {
    //         setHostId(res.data._id)
    //     })
    //     .catch(err => console.log(err))
    // }

    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/airbnb/host/login`, host, {withCredentials:true})
            .then(res=>{
                // getHostId()
                navigate(`/home`)})
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <>
        <Header/>
        <div className="register">
            <form className='resgister_form' onSubmit={submitHandler}>
            <p>
                <input type="text" name="email" placeholder='Email' onChange={changeHandler}/>
            </p>
            <p>
                <input type="password" name="password" placeholder='Password' onChange={changeHandler}/>
            </p>
            <Button varriant='outlined' type="submit">Login</Button>
            </form>
            
        </div>
        <Footer/>
        </>
    )
}

