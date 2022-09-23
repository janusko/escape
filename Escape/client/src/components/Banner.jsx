import { Button } from '@mui/material'
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/banner.css'

export default () => {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="banner">
            <div className='banner_info'>
                <h1>Get out and stretch your imagination</h1>
                <h5>Plan a different kind of getaway to uncover the hidden gems near you.</h5>
                <Button onClick ={ () => navigate('/search')} varriant='outlined'>Explore Nearby</Button>
            </div>
        </div>
    )
}

