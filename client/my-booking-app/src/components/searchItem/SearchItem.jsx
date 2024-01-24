import React from 'react';
import "./SearchItem.css"

const SearchItem = ({data, onHotelClick}) => {
  
  return (
    <div className='searchItem'>
      <img 
        src={data.photos}
        alt="" 
        className="siImg" 
     />
      <div className="siDesc">
        <h1 className="siTitle">{data.name}</h1>
        <span className="siDistance">{data.distance} from center</span>
        <span className="siTaxiOp">Free cancellation</span>
        <span className="siSubtitle">
          City: {data.city}
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        {/* <span className="siCancelOp">Free cancellation </span> */}
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <button>{data.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${data.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={onHotelClick}>Click for details</button>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
