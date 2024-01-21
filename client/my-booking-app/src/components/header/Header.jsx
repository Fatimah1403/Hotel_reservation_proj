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
import { useNavigate } from "react-router-dom"

const Header = ({ type }) => {
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState("");
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

    const navigate = useNavigate()

    const handleOption = (name, operation)=>{
        setOptions(prev=>{return{
           ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        }})
    }
    const handleSearch = () => {
        navigate("/hotels", { state: { destination, date, options } })
    }

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
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
        
        { type !== "list" &&
            <>
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
                            onChange={(event) => setDestination(event.target.value)}
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
                        <span onClick={() =>setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult. ${options.children} children . ${options.room} room`}</span>
                        {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionsText">Adult</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.adult <= 1}
                                        className="optionsCounterButton" onClick={()=>handleOption("adult", "d")}
                                    >-</button>
                                    <button className="optionCounterNumber">{options.adult}</button>
                                    <button className="optionsCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                                </div>

                            </div>
                            <div className="optionItem">
                                <span className="optionsText">Children</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.children <= 0} 
                                        className="optionsCounterButton" onClick={()=>handleOption("children", "d")}
                                    >-</button>
                                    <button className="optionCounterNumber">{options.children}</button>
                                    <button className="optionsCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionsText">Room</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.room <= 1}
                                        className="optionsCounterButton" onClick={()=>handleOption("room", "d")}
                                    >-</button>
                                    <button className="optionCounterNumber">{options.room}</button>
                                    <button className="optionsCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>  
                    </div>
                </div>
            </>
        }

      </div>
    </div>
  );
};

export default Header
