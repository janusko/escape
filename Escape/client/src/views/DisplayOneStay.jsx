import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import React, { useEffect, useState} from 'react'

const DisplayOneStay = () => {
    const [stay, setStay] = useState()
    const {stayId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/stay/one/${stayId}`, {withCredentials: true})
            .then(response => {
                setStay(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
        <Header />
        
        <div className="card">
            {stay &&
            <>
            <img src={`/images/${stay.image}`} alt="stay"/>
            <div className='card__info'>
                <h2>{stay.name}</h2>
                <h2>{stay.address}</h2>
                <h4>{stay.description}</h4>
                <h3>${stay.price} / night</h3>
                <h3>{stay.type}</h3>
                <h3>{stay.numberOfRoom}</h3>
                <h3>{stay.numberOfPeople}</h3>
                <h3>{stay.cancelation}</h3>
            </div>
            </>
            }

        </div>
        <Footer />
        </>
    )
}

export default DisplayOneStay