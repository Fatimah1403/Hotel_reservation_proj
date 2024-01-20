import React from 'react';
import "./Home.css";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Featured from '../../components/featured/Featured';
import ProperList from '../../components/properList/ProperList';
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties';
import MailList from '../../components/mailList/MailList';

const Home = () => {
  return (
   <>
    <Navbar/>
    <Header/>
    <div className="homeContainer">
      <Featured/>
      <h1 className='homeTitle'>Browse by our property type</h1>
      <ProperList/>
      <h1 className='homeTitle'>Finding the comfort you want</h1>
      <FeaturedProperties/>
      <MailList/>

    </div>
   </>
  )
}

export default Home
