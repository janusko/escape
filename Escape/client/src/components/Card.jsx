import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/card.css'

export default ({stay}) => {
    const navigate = useNavigate()
    return (
        <div className="card">
            <img src={`/images/${stay.image}`} alt="stay"/>
            <div className='card__info'>
                <h2 onClick= {() => {navigate(`/display/one/${stay._id}`)}}>{stay.name}</h2>
                <h4>{stay.description}</h4>
                <h3>${stay.price} / night</h3>
            </div>
        </div>
    )
}

