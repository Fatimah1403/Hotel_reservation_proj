import { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import "./List.css"
import { useLocation } from 'react-router-dom'
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from '../../components/searchItem/SearchItem'

const List = () => {

  const location = useLocation();
  const defaultState = {
    destination: '',
    date: [{ startDate: new Date(), endDate: new Date() }],
    options: { adult: 1, children: 0, room: 1 },
  };
  const [destination, setDestination] = useState(location.state?.destination || defaultState.destination);
  const [date, setDate] = useState(location.state?.date || defaultState.date);
  const [options, setOptions] = useState(location.state?.options || defaultState.options);
  const [openDate, setOpenDate] = useState(false);


  // console.log(location)
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className='lsTitle'>Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={()=> setOpenDate(!openDate)}
                  >{`${format(date[0].startDate, "MM/dd/yyyy")} To ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                  )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                <div className="lsOptionsItem">
                  <span className="lsOptionsText">
                    Min prices <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionsItem">
                  <span className="lsOptionsText">
                    Max prices <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionsItem">
                  <span className="lsOptionsText">
                   Adult
                  </span>
                  <input 
                    type="number" min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionsItem">
                  <span className="lsOptionsText">
                    Children 
                  </span>
                  <input 
                    type="number" min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionsItem">
                  <span className="lsOptionsText">
                    Room 
                  </span>
                  <input 
                    type="number" min={1}
                    className="lsOptionInput" 
                    placeholder={options.room}
                  />
                </div>
              </div>   
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
          <     SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
                <SearchItem/>
          </div>
                
        </div>
      </div>
    </div>
  )
}

export default List
