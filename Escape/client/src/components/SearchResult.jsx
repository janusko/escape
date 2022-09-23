import React, { useEffect, useState } from 'react'
import '../styles/searchResult.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios'
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
    const { stays, star, price, total, nights }=props


    return (
        <div>
            {stays.map((item, idx) => 
        <div className="searchResult">
            <img src={`./images/${item.image}`} alt="#" />
            <FavoriteBorderIcon className="searchResult__heart" />
            <div className='searchResult__info'>
                <div className='searchResult__infoTop'>
                    <p>{item.address}</p>
                    <h3>{item.name}</h3>
                    <p>_____</p>
                    <p>{item.description}</p>
                </div>
                <div className='searchResult__infoBottom'>
                    <div className='searchResult__stars'>
                        <StarIcon className="searchResult__star" />
                        <p><strong>{star}</strong></p>
                    </div>
                </div>
                <div className='searchResult__price'>
                    <p>${item.price} /night</p>
                    <p>${nights * item.price} total</p>
                </div>
            </div>
        </div>
        )}
        </div>
    )
}

