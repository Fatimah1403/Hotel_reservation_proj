import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./List.css";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { hotelsData } from "../../data/hotel";
import { useNavigate } from 'react-router-dom';


const List = () => {
  const location = useLocation();
  const defaultState = {
    destination: "",
    date: [{ startDate: new Date(), endDate: new Date() }],
    options: { minPrice: "", maxPrice: "", adult: 1, children: 0, room: 1 },
  };

  const [filters, setFilters] = useState({
    destination: location.state?.destination || defaultState.destination,
    date: location.state?.date || defaultState.date,
    options: location.state?.options || defaultState.options,
  });

  const [openDate, setOpenDate] = useState(false);
  const [filteredHotelData, setFilteredHotelData] = useState(hotelsData);
  const [cities] = useState(hotelsData);
  const navigate = useNavigate()

  const handleInputChange = (e, field) => {
    setFilters({
      ...filters,
      options: {
        ...filters.options,
        [field]: e.target.value,
      },
    });
  };

  const handleSearch = () => {
    const filteredHotel = hotelsData.filter((hotel) => {
      return (
        hotel.city.toLowerCase().includes(filters.destination.toLowerCase()) &&
        (!filters.options.minPrice ||
          hotel.cheapestPrice <= parseInt(filters.options.minPrice, 10))
      );
    });
    setFilteredHotelData(filteredHotel);
  };


  const handleHotelClick = (id) => {
    navigate(`/hotels/${id}`)
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <select
                value={filters.destination}
                onChange={(e) =>
                  setFilters({ ...filters, destination: e.target.value })
                }
                className="selects"
              >
                <option value="">Select Destination</option>
                {cities.map((option) => (
                  <option key={option._id} value={option.city}>
                    {option.city}
                  </option>
                ))}
              </select>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(
                  filters.date[0].startDate,
                  "MM/dd/yyyy"
                )} To ${format(filters.date[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) =>
                    setFilters({ ...filters, date: [item.selection] })
                  }
                  minDate={new Date()}
                  ranges={filters.date}
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
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={filters.options.minPrice}
                    onChange={(e) => handleInputChange(e, "minPrice")}
                  />
                </div>
                <div className="lsOptionsItem">
                  <span className="lsOptionsText">
                    Max prices <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={filters.options.maxPrice}
                    onChange={(e) => handleInputChange(e, "maxPrice")}
                  />
                </div>
                <div className="lsOptionsItem">
                  <span className="lsOptionsText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={filters.options.adult}
                    onChange={(e) => handleInputChange(e, "adult")}
                  />
                </div>
                <div className="lsOptionsItem">
                  <span className="lsOptionsText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={filters.options.children}
                    onChange={(e) => handleInputChange(e, "children")}
                  />
                </div>
                <div className="lsOptionsItem">
                  <span className="lsOptionsText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={filters.options.room}
                    onChange={(e) => handleInputChange(e, "room")}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {filteredHotelData.length !== 0 ? (
              filteredHotelData.map((hotel) => (
                <SearchItem key={hotel._id} data={hotel} onHotelClick={() => handleHotelClick(hotel._id)} />
              ))
            ) : (
              "No data Associated with this search keyword"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
