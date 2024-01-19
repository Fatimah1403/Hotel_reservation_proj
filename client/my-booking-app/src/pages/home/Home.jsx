import React from 'react';
import "./Home.css";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Featured from '../../components/featured/Featured';

const Home = () => {
  return (
   <>
    <Navbar/>
    <Header/>
    <div className="homeContainer">
      <Featured/>
      <Featured/>
    </div>
   </>
  )
}

export default Home
