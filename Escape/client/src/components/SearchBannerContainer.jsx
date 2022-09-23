import React, {useState, useContext, useRef} from 'react'
import '../styles/searchBannerContainer.css'
import SearchIcon from '@mui/icons-material/Search';
import  DatePicker  from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css"

export default (props) => {
    const {setStartDateInResults, setEndDateInResults} = props

    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        setStartDateInResults(startDate.toString())
        setEndDateInResults(endDate.toString())
    }

    return (
        <div className="search">
                    <form onSubmit={handleSearchSubmit} className="search__form">
                    <div className="search__form-start-date search__form-element">
                        <p>Start Date</p>

                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat='dd-MM-yy' id="endDate"/>
                    </div>

                    <div className="search__form-end-date search__form-element">
                        <p>End Date</p>
                        <DatePicker selected={endDate} onChange={(date) => {
                            setEndDate(date)
                        }} dateFormat='dd-MM-yy' id="endDate"/>
                    </div>

                    <Button type="submit"><SearchIcon sx={{ color: "#972e79"}} className="searchIcon"/></Button>

                    </form>
                </div>
    );
};


