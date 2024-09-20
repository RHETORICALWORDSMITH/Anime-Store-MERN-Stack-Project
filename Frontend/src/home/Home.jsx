import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import "../style.css";
import Main from "../components/Main";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Main />
      <div className="relative z-50 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
