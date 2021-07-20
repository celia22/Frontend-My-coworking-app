import React from 'react';
import { Link } from 'react-router-dom';
import ReservationCards from "../components/Reservations/ReservationsCards"

const UserMenu = (props) => {
console.log("user props", props)
  return(
    <>
    <Link to={"/user/main"}> Back </Link>
    
    <h1> This is your user menu page</h1>

    <button>  <Link to="/user/:id/update-profile">Edit Account </Link> </button> 
    
    < ReservationCards />
  
     {/* call my payments (BG) */}
 

    </>
  )
}

export default UserMenu;