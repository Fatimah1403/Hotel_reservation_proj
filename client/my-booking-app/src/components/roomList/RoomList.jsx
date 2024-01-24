import "./RoomList.css";
import { useState, useEffect } from "react";
import Hotelfeat from "../../assets/images/Hotelfeat.jpg";
import { roomsData } from "../../data/room";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const RoomList = () => {
  const { id } = useParams();
  const [hotelRooms, setHotelRooms] = useState([]);

  useEffect(() => {
    // Filter roomsData based on the hotel_id
    const filteredRooms = roomsData.filter(
      (room) => room.hotel_id === Number(id)
    );

    // Set the filtered rooms to the state
    setHotelRooms(filteredRooms);
  }, [id]);
  if (hotelRooms) {
    console.log(hotelRooms);
  }
  return (
    <>
      <h1 className="custom-heading">Hotel Rooms</h1>
      <div className="ui special cards">
        {hotelRooms.length !== 0 ? (
          hotelRooms.map((room) => (
            <div className="card" key={room._id}>
              <div className="blurring dimmable image">
                <img src={Hotelfeat} alt="User Avatar" />
                <div className="ui dimmer">
                  <div className="content">
                    <div className="center">
                      <Link
                        to={`/room/${room._id}`}
                        style={{ textDecoration: "none" }}
                        className="ui inverted button"
                      >
                        Book Room
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content">
                <a className="headers">Room No: {room.roomNumber}</a>
                <div className="meta">
                  <span className="dates">
                    Price per Night: ${room.pricePerNight}
                  </span>
                </div>
              </div>
              <div className="extra content">
                {room.available ? (
                  <span>
                    Status:{" "}
                    <i className="users icon" style={{ color: "green" }}>
                      Available
                    </i>
                  </span>
                ) : (
                  <span>
                    Status:{" "}
                    <i className="users icon" style={{ color: "red" }}>
                      Occupied
                    </i>
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </>
  );
};

export default RoomList;
