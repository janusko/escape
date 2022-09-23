import { Button } from '@mui/material'
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/register.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from "axios"

export default () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState({});

    const [errors, setErrors] = useState([])

    const handleSubmit =(e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        formData.append('image', image)
        console.log("formData", formData.get("firstName"))
        console.log(image)

        axios.post(`http://localhost:8000/api/airbnb/user`, formData, {withCredentials: true} )
        // axios.post(`http://localhost:8000/api/airbnb/user`, {firstName, lastName, email, password, confirmPassword})
        .then(res => {
            console.log(res.response)
            navigate(`/dashboard/user`)
        })
        .catch(err=>{
            const errorResponseDataErrors = err.response.data.errors
            console.log(errorResponseDataErrors)
            const errMsgArr =[]
            for(const eachKey in errorResponseDataErrors){
                errMsgArr.push(errorResponseDataErrors[eachKey].message)
            }
            setErrors(errMsgArr)
        })
    }

    return (
        <>
        <Header/>
        <div className="register">
            <form className='resgister_form' onSubmit={handleSubmit} encType='multipart/form-data'>

            {errors.map((err, index) =>
                    <p key={index} style={{ color: "red" }}>{err}</p>)}

            <p>
                <input type="text" name="firstName" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </p>
            <p>
                <input type="text" name="lastName" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </p>
            <p>
                <input type="text" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </p>
            <p>
                <input type="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </p>
            <p>
                <input type="password" name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </p>
            <p>
            <label> Image : </label>
                    <input type="file" name="image"
                        onChange={(e) => setImage(e.target.files[0])} />
            </p>

            <Button varriant='outlined' type="submit">Register</Button>
            </form>
            
        </div>
        <Footer/>
        </>
    )
}

