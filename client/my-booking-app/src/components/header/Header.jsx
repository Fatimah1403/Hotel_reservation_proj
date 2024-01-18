import React from 'react'
import  { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faBed,
    faCar,
    faTaxi,
    faPlane
 } from '@fortawesome/free-solid-svg-icons'
import "./Header.css"

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
            <div className="headerListItem active">
                <FontAwesomeIcon icon={ faBed} />
                <span> Your Stay</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={ faPlane} />
                <span>Book Your Flights</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={ faCar} />
                <span>Car Rentals</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={ faTaxi} />
                <span> Airport taxis</span>
            </div>
            <div className="headerListItem">
                <FontAwesomeIcon icon={ faBed} />
                <span>Adventure</span>
            </div>
        </div>
        <h1 className="headerTitle">
            Explore the World with Us
        </h1>
        <p className='headerDescription'>
         Discover your ideal stay with our Bookme app.
          Find luxurious, cozy, or budget-friendly accommodations 
          for your next adventure. <br />Explore, book, 
          and experience comfort like never before.
        </p>

        <button className="headerBtn">Sign Up / Sign In</button>

      </div>
    </div>
  )
}

export default Header
