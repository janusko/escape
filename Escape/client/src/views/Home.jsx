import React, {useState, useEffect} from 'react'
import '../styles/home.css'
import Banner from '../components/Banner'
import Card from '../components/Card'
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios'

export default () => {
    const [stays, setStays] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/stay')
        .then(response => {
                setStays(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
    <>
        <Header/>
        <div className="home">
            <Banner/>
            <div className='cardArea'>
            {stays.map((item, idx) => 
                <Card key={idx} stay={item}/>
                )}
            </div>
        </div>
        <Footer/>
        </>
    )
}

