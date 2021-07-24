import React from 'react';
import { Link } from 'react-router-dom';
import ReservationCards from "../components/Reservation/Cart";
import "./styles/buttons.css"

const UserMenu = (props) => {
console.log("user props", props)
  return(
    <>
    <Link to={"/user/main"} className="back_button"> &laquo; Back </Link>
    
    <h1> This is your user menu page</h1>

    <button className="edit_button">  <Link to="/user/:id/update-profile" className="button_link">Edit Account </Link> </button> 
    
    < ReservationCards />
  
     {/* call my payments (BG) */}
 

    </>
  )
}

export default UserMenu;