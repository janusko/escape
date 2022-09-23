import React, {useState} from 'react'
import '../styles/search.css';
import { DateRangePicker } from 'react-date-range';
import { Button } from '@mui/material'
import "react-date-range/dist/styles.css";
import 'react-date-range/dist/theme/default.css';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState (new Date());
    const [endDate, setEndDate] = useState (new Date());

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    };

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    return (
        <div className="search">
            <DateRangePicker ranges = {[selectionRange]} onChanges={handleSelect}/>
            <h2>Number of guests
            <PeopleIcon sx={{ color: "#972e79"}}/>
            </h2>
            
            <input min={0} defaultValue={2} type="number"/>
            <Button onClick ={ () => navigate('/search')}>Search Airbnb</Button>
        </div>
    )
}

