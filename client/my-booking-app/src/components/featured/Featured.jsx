import { useState, useEffect } from "react";
import React from "react";
import "./Featured.css";
import { hotelsData } from "../../data/hotel";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [randomItems, setRandomItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const sortedData = [...hotelsData].slice(0, 3);
    setRandomItems(sortedData);

    const interval = setInterval(() => {
      const shuffledData = [...hotelsData].sort(() => Math.random() - 0.5);
      const sortedData = shuffledData.slice(0, 3);
      setRandomItems(sortedData);
    }, 5000);

    return () => clearInterval(interval)
  }, []);

  const handleImageClick = (id) => {
    navigate(`/hotels/${id}`)
  }
  return (
    <div className="featured">
      {randomItems.map((data) => (
        <div className="featuredItem" key={data._id}>
          <a onClick={() => handleImageClick(data._id)}>
            <img src={data.photos} alt="" className="featuredimg" />
            <div className="featuredTitles">
              <h1>{data.city}</h1>
              <h2>563 Properties</h2>
            </div>
          </a>
        </div>
      ))}

      {/* <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="featuredimg"
        />
        <div className="featuredTitles">
          <h1>New York</h1>
          <h2>River Flow</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredimg"
        />
        <div className="featuredTitles">
          <h1>Los Angeles</h1>
          <h2>Hill View</h2>
        </div>
      </div> */}
    </div>
  );
};

export default Featured;
