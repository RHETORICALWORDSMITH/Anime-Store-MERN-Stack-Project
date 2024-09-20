import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchedAnime } from "../context/searchProvider.jsx";
import axios from "axios";
import video from "../../public/homePics/video.mp4";
import { Link } from "react-router-dom";

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // For useContext
  const [search, setSearch] = useSearchedAnime();

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/search/${searchTerm}`
      );
      const searchInfo = response.data;
      if (searchInfo.length > 0) {
        setSearch(searchInfo);
        if (window.location != "http://localhost:5173/collection") {
          navigate("/collection");
        }
      } else {
        toast.error("This anime does not exist!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="h-screen relative overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 flex items-center p-3 md:p-9 lg:p-9 xl:p-9 mt-[70px] h-full w-screen">
          <div className="flex flex-col gap-8 md:gap-16">
            <h1 className="text-red-500 animate-pulse font-bold text-2xl md:text-5xl lg:text-5xl xl:text-5xl -skew-x-12">
              Anime Store
            </h1>
            <span className="md:text-xl lg:text-xl xl:text-xl text-white w-[350px] -skew-x-12">
              Your one-stop shop for exclusive anime merchandise and
              collectibles!
            </span>
            <Link to={"/collection"}>
            <span
              className="relative flex items-center justify-center py-3 px-8 cursor-pointer bg-gradient-to-r from-red-800 to-orange-600 text-white font-extrabold text-lg uppercase tracking-widest rounded-lg shadow-[0px_4px_15px_rgba(255,100,0,0.7)] 
    border-4 border-red-600 hover:bg-gradient-to-r hover:from-orange-600 hover:to-yellow-400 hover:scale-105 transition-transform duration-200 ease-out 
    after:content-[''] after:absolute after:-inset-1 after:border-2 after:border-yellow-400 after:rounded-lg after:opacity-0 hover:after:opacity-100 hover:after:shadow-[0px_0px_15px_rgba(255,255,100,0.8)] -skew-x-12"
            >
              Shop Now
            </span>
            </Link>
          </div>
        </div>
        <div className="bg-black opacity-75 absolute inset-0 w-screen h-screen"></div>
      </div>
    </>
  );
};

export default Banner;
