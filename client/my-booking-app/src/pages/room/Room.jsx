import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./Room.css";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { hotelsData } from "../../data/hotel";
import { hotelImages } from "../../data/hotelImages";
import BookingSummary from "../../components/bookingSummary/BookingSummary";

const Room = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [hotel, setHotel] = useState([]);
  const [hotelImage, setHotelImages] = useState([]);

  useEffect(() => {
    if (Array.isArray(hotelsData) && hotelsData.length > 0) {
      const hotelDetails = hotelsData.find((val) => val._id === Number(id));

      if (hotelDetails) {
        setHotel(hotelDetails);

        const imagesForHotel = hotelImages.find(
          (img) => img.hotel_id === Number(id)
        );

        if (imagesForHotel) {
          setHotelImages(imagesForHotel.photos);
        } else {
          console.error("Images not found for Hotel ID:", id);
        }
      } else {
        console.error("Hotel not found for ID:", id);
      }
    } else {
      console.error("Invalid or empty hotelsData array");
    }
  }, [id]);

  if (!hotel || !hotelImage.length) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen()}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleScroll("left")}
            />
            <div className="sliderWrapper">
              <img
                src={hotelImages[0]?.photos[slideIndex]}
                alt=""
                className="sliderImg"
              />
            </div>

            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleScroll("right")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">Some Name Here</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Some address</span>
          </div>
          <span className="hotelDistance">
            Excellent location – 500m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over 104 at this property and get a free airport taxi
          </span>
          <BookingSummary />
          
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Room;
