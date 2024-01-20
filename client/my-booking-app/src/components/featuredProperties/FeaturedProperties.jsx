import React from 'react'
import "./FeaturedProperties.css"
// import Hotelprop1 from "../../assets/images/Hotelprop1.jpg"
// import Hotelprop2 from "../../assets/images/Hotelprop2.jpg"
import Hotelfeat  from "../../assets/images/HotelProp3.jpg"


const FeaturedProperties = () => {
  return (
    <div className='featuredprop'>
      <div className="fpItem">
            <img 
                src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
                alt="" 
                className="fpImg" 
            />
            <span className='fpName'>Apartment Stare Miastro</span>
            <span className='fpCity'>Madrid</span>
            <span className='fpPrice'>Starting from $120</span>
            <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
            </div>
      </div>
      <div className="fpItem">
        <img 
            src="https://cf.bstatic.com/xdata/images/hotel/square600/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
            alt="" 
            className="fpImg" 
        />
        <span className='fpName'>Comfort Suites Airport</span>
        <span className='fpCity'>Austin</span>
        <span className='fpPrice'>Starting from $140</span>
        <div className="fpRating">
            <button>9.9</button>
            <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img 
            src="https://cf.bstatic.com/xdata/images/xphoto/square600/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
            alt="" 
            className="fpImg" 
        />
        <span className='fpName'>Four Seasons Hotel</span>
        <span className='fpCity'>Lisbon</span>
        <span className='fpPrice'>Starting from $90</span>
        <div className="fpRating">
            <button>8.8</button>
            <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img 
            src="https://cf.bstatic.com/xdata/images/hotel/square600/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"

            alt="" 
            className="fpImg" 
        />
        <span className='fpName'>Comfort Suites Airport</span>
        <span className='fpCity'>Berlin</span>
        <span className='fpPrice'>Starting from $105</span>
        <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProperties
