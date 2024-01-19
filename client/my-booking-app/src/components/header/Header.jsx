import React from 'react';
import {useState} from 'react'
import  { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faBed,
    faCar,
    faTaxi,
    faPlane,
    faCalendarDays,
    faPerson
 } from '@fortawesome/free-solid-svg-icons'
import "./Header.css"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"

const Header = () => {
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })


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
        <div className="headerSearch">
            <div className="headerSearchItem">
                 <FontAwesomeIcon icon={ faBed}className="headerIcon" />
                 <input 
                    type="text"
                    placeholder='Where are you going'
                    className="headerSearchBar"
                 />
            </div>
            <div className="headerSearchItem">
                 <FontAwesomeIcon icon={ faCalendarDays } className="headerIcon" />
                 <span onClick={()=> setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                 {openDate && <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                />}
        
            </div>
            <div className="headerSearchItem">
                 <FontAwesomeIcon icon={ faPerson }className="headerIcon" />
                 <span className='headerSearchText'>{`${options.adult} adult. ${options.children} children . ${options.room} room`}</span>
                 <div className="options">
                    <div className="optionItem">
                        <span className="optionsText">Adult</span>
                        <button className="optionsCounterButton">-</button>
                        <button className="optionCounterNumber">1</button>
                        <button className="optionsCounterButton">+</button>

                    </div>
                    <div className="optionItem">
                        <span className="optionsText">Children</span>
                        <button className="optionsCounterButton">-</button>
                        <button className="optionCounterNumber">0</button>
                        <button className="optionsCounterButton">+</button>

                    </div>
                    <div className="optionItem">
                        <span className="optionsText">Room</span>
                        <button className="optionsCounterButton">-</button>
                        <button className="optionCounterNumber">1</button>
                        <button className="optionsCounterButton">+</button>

                    </div>
                 </div>
            
            </div>
            <div className="headerSearchItem">
                <button className="headerBtn">Search</button>  
            </div>
        </div>

      </div>
    </div>
  );
};

export default Header
