import Hotelfeat from "../../assets/images/HotelFeat.jpg";
import "./BookingSummary.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { daysCalculator } from "../utils/dayCalculator";
import { priceFormatter } from "../utils/priceFormatter";

const BookingSummary = () => {
  const today = new Date();
  const [openDate, setOpenDate] = useState(false);
  const [days, setDays] = useState(null);
  const [grandTotal, setGrandTotal] = useState(null);
  const [subTotal, setSubtotal] = useState(null);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const pricePerNight = 200
  useEffect(() => {
    if (date[0]) {
      const day = daysCalculator(date);
      setDays(day);
    }
    const tax = 0.2
    const subTotal = pricePerNight*days
    const grandTotal = (subTotal*tax) + subTotal
    setSubtotal(subTotal)
    setGrandTotal(grandTotal)
  }, [date, pricePerNight, days]);

  return (
    <>
      <div className="booking-summary">
        <div className="booking-card card">
          <div className="blurring dimmable image">
            <img src={Hotelfeat} alt="User Avatar" />
            <div className="ui dimmer">
              <div className="content">
                <div className="center"></div>
              </div>
            </div>
          </div>
          <div className="content">
            <a className="headers">Room No: 110</a>
            <div className="meta">
              <span className="dates">Price per Night: {pricePerNight}</span>
            </div>
          </div>
          <div className="extra content">
            <span>
              Status:{" "}
              <i className="users icon" style={{ color: "green" }}>
                Available
              </i>
            </span>
          </div>
        </div>
        <div className="booking-info">
          <div className="order-summary">
            <div className="custom-section">
              <h2>User Details</h2>
              <p>Name: John Doe</p>
              <p>Email: john.doe@example.com</p>
              <p>Address: 123 Main St, Cityville</p>
            </div>

            <div className="custom-section order-details">
              <h2>Booking Details</h2>
              <div className="columns">
                <div className="rows">
                  <p>Name: Grand Royale Hotel</p>
                  <p>Room Number: 102</p>
                  <p>Price: {priceFormatter(pricePerNight, "usd")}</p>
                  <p>Subtotal: {priceFormatter(subTotal, "usd")}</p>
                  <p>Tax: 20%</p>
                </div>
                <div className="rows">
                  <h3>CheckIn/CheckOut</h3>
                  <div className="headerSearchItem">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="headerIcon"
                    />
                    <span
                      onClick={() => setOpenDate(!openDate)}
                      className="headerSearchText"
                    >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                      date[0].endDate,
                      "MM/dd/yyyy"
                    )}`}</span>
                    {openDate && (
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        minDate={today} // Set the minimum date
                        className="date"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="total">
              <p>Total: {priceFormatter(grandTotal, "usd")}</p>
            </div>
            <div className="action-buttons">
              <button className="cancel-btn">Cancel</button>
              <button className="btn">Proceed to Book</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingSummary;
