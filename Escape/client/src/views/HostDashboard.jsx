import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import Card from '../components/Card';
import '../styles/hostDashboard.css'

export default () => {
    // const navigate = useNavigate();
    const [host, setHost] = useState()
    const [stays, setStays] = useState([])

    const { id } = useParams()

    const navigate = useNavigate()

    const filteredList = (stayId) => {
        const updatedList = stays.filter((stay)=>stay._id !== stayId)
        setStays(updatedList)
    }

    useEffect(() => {
        console.log("id", id)
        axios.get(`http://localhost:8000/api/stay/${id}`, { withCredentials: true })
            .then(response => {
                console.log("stays", response.data)
                setStays(response.data)
            })
            .catch(err => console.log(err))
        axios.get(`http://localhost:8000/api/airbnb/host/${id}`, { withCredentials: true })
            .then(response => setHost(response.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (stayId) => {
        axios.delete(`http://localhost:8000/api/stay/${stayId}`)
            .then(response => {
                filteredList(stayId)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='Container'>
            <Header />
            {host &&
                <>
                    <h1>Welcome {host.firstName}</h1>
                    {stays &&
                        <>
                            <Button varriant='outlined' onClick={() => navigate(`/create/${id}`)} id="create">Create a Stay</Button>

                            <div className='cardArea'>
                                {stays.map((item, idx) =>
                                    <>
                                        <Card key={idx} stay={item} className="card"/>
                                        <div className='editButtons'>
                                        <Button varriant='outlined' onClick= {() => {navigate(`/edit/${id}/${item._id}`)}} className="delete">Edit</Button>
                                        <Button varriant='outlined' onClick={() =>{handleDelete(item._id)}} id="delete">Delete</Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    }
                </>
            }
            <Footer />
        </div>
    )

}