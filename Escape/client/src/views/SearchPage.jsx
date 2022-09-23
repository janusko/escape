import { Button } from '@mui/material'
import React, { useEffect, useState }  from 'react'
import SearchBannerContainer from '../components/SearchBannerContainer';
import '../styles/searchPage.css'
import SearchResult from '../components/SearchResult'
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios'
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';


export default (props) => {
    const [stays, setStays] = useState([]);
    // const [filterStays, setFilterStays] = useState([])
    const [type, setType] = useState("")
    const [room, setRoom] = useState("")
    const [people, setPeople] = useState(1)
    const [nights, setNights] = useState(1)
    const [refresh, setRefresh] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [defaultCenter, setDefaultCenter] = useState({
        lat: 39.8283, lng: -98.5795
    })

    const [markerPosition, setMarkerPosition] = useState([])

    const mapStyles = {
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        height: "400px",
        width: "800px",
        borderRadius: "20px"
    };

    const [selected, setSelected] = useState();
    const [coordFromSelec, setCoordFromSelec] = useState();

    const onSelect = item => {
        setSelected(item);
        let coord = {lat: item["lat"], lng: item["lng"]}
        setCoordFromSelec(coord)
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/stay')
        .then(response => {
                if (!room && type) {
                    const filterStyleList = response.data.filter((eachStay) => type === eachStay.type)
                    setStays(filterStyleList)
                } 
                if (room && !type) {
                    const filterRoomList = response.data.filter((eachStay) => room === eachStay.numberOfRoom)
                    setStays(filterRoomList)
                }
                if (room && type) {
                    const filterStyleList = response.data.filter((eachStay) => type === eachStay.type).filter((eachStay) => room === eachStay.numberOfRoom)
                    setStays(filterStyleList)
                }
                if  (!type && !room) {
                    setStays(response.data)
                }
            })
            .catch(err => console.log(err))
    }, [refresh])

    const HandleChangeT = (e) => {
        setType(e.target.value)
        setRefresh(!refresh)
    }
    const HandleChangeR = (e) => {
        setRoom(parseInt(e.target.value))
        setRefresh(!refresh)
    }
    const HandleChangeP = (e) => {
        setPeople(parseInt(e.target.value))
        setRefresh(!refresh)
    }
    const HandleChangeN = (e) => {
        setNights(parseInt(e.target.value))
        setRefresh(!refresh)
    }

    const setStartDateInResults = (date) => {
        console.log("Console from SearchPage")
        setStartDate(date)
    }
    const setEndDateInResults = (date) => {
        setEndDate(date)
    }

    return (
        <>
            <Header setStartDateInResults={setStartDateInResults} setEndDateInResults={setEndDateInResults}/>

            <div className="searchPage">
                <div className='searchPage__info'>
                    <p>{stays.length} stays | {moment(startDate).format('DD MMMM')} to {moment(endDate).format('DD MMMM')} | {people} guest(s) | {nights} Night(s)</p>
                    <h1>Stays nearby</h1>
            </div>

            <div className='header_center'>
                    <SearchBannerContainer setStartDateInResults={setStartDateInResults} setEndDateInResults={setEndDateInResults}/>
                    </div>
                    <div className='filters'>
                    <Button variant="outlined">
                        <select className="selectStay" onChange={HandleChangeT}>
                            <option hidden>Type of Stay</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="yourt">Yourt</option>
                            <option value="tent">Tent</option>
                            <option value="cabana">Cabana</option>
                            <option value="island">Island</option>
                            <option value="castle">Castle</option>
                        </select>
                    </Button>
                    <Button variant="outlined">
                    <select className="selectStay" onChange={HandleChangeR}>
                            <option hidden>Number of Rooms</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </Button>
                    <Button variant="outlined">
                    <select className="selectStay" onChange={HandleChangeP}>
                            <option hidden>People</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </Button>
                    <Button variant="outlined">
                    <select className="selectStay" onChange={HandleChangeN}>
                            <option hidden>Number of Nights</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                        </select>
                    </Button>

                </div>
                <div className='map'>
                    {/* <p>{markerPosition[0]}</p> */}
                    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap mapContainerStyle={mapStyles} zoom={3} center={defaultCenter}>
                            {stays.map((item, idx) => {
                                let coordinates = {}
                                coordinates["lat"] = item.lat;
                                coordinates["lng"] = item.lng;
                                return (
                                    <MarkerF position={coordinates}
                                        icon={{
                                            path: faHouseChimney.icon[4],
                                            fillColor: "#c41951",
                                            fillOpacity: 1,
                                            strokeWeight: 1,
                                            strokeColor: "#4b1fa4",
                                            scale: 0.05
                                        }
                                        }
                                        onClick={() => onSelect(item)}
                                    />)
                            })
                            }
                            {selected &&  

                            <InfoWindow position={coordFromSelec} clickable={true} onCloseClick={() => setSelected()} >
                                <div className="infowindow">
                                    <img src={`/images/${selected.image}`} className="small-image" alt="listing" id="popUpImg"/>
                                    <p>{selected.name}</p>
                                    <p>${selected.price}</p>
                                    <p>{selected.description}</p>
                                    <p>{selected.numberOfRoom} Bedrooms {selected.numberOfPeople} People</p>
                                </div>
                            </InfoWindow>
                            }
                        </GoogleMap>
                    </LoadScript>
                </div>
                <div id="results">
                    <SearchResult stays={stays} nights={nights}
                        star={4.73}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}

