import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";

const ActionAnime = () => {
  const [actionAnime, setActionAnime] = useState([]);
  const [sliderKey, setSliderKey] = useState(0); // state to force re-render the slider

  useEffect(() => {
    const getAnime = async () => {
      try {
        console.log("working on it");
        let res = await axios.get("http://localhost:3000/anime");
        const data = res.data;
        const filterData = data.filter((item) => {
          return item.genre === "Action";
        });
        console.log(filterData);
        console.log(res.data);
        setActionAnime(filterData);
        setSliderKey((prevKey) => prevKey + 1); // Increment key to force re-render
      } catch (error) {
        console.log(error);
      }
    };

    getAnime();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500, // Larger screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl flex flex-col items-center justify-center container mx-auto md:px-20 px-4 mt-32">
        <span className=" flex flex-col font-bold z-10">
          <span className="text-5xl text-center text-white">Buy Comics</span>
          <Link to={"/collection"} className="text-center">
            <button className="mt-5 bg-white py-2 px-5 rounded-full text-black hover:bg-pink-600">
              Checkout
            </button>
          </Link>
        </span>

        <div className="lg:w-2/3 w-11/12">
          <Slider key={sliderKey} {...settings}>
            {actionAnime.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ActionAnime;
