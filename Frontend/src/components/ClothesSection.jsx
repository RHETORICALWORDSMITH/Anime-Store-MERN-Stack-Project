import React from "react";
import halloweenShirt from "../../public/homePics/halloweenShirt.png";
import bleachShirt1 from "../../public/homePics/bleachShirt2.png";
import bleachShirt2 from "../../public/homePics/bleachShirt3.png";
import demonShirt1 from "../../public/homePics/demonSlayerShirt1.png";
import demonShirt2 from "../../public/homePics/demonSlayerShirt2.png";
import demonShirt3 from "../../public/homePics/demonSlayerShirt3.png";
import { Link } from "react-router-dom";
const ClothesSection = () => {
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center bg-[url('../../public/homePics/halloweenBackground.png')] bg-cover bg-center bg-no-repeat mt-64 md:mt-0 lg:mt-0 xl:mt-0">
        <h1 className="text-4xl font-bold text-black">Spooky Styles</h1>
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="relative  bg-black bg-opacity-70 p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img
              src={bleachShirt1}
              alt="Halloween Shirt"
              className="mt-2 w-20 md:w-24"
            />
          </div>

          {/* Card 2 */}
          <div className="relative  bg-black bg-opacity-70 p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img
              src={bleachShirt2}
              alt="Halloween Shirt 2"
              className="mt-2 w-20 md:w-24"
            />
          </div>

          {/* Card 3 */}
          <div className="relative  bg-black bg-opacity-70 p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img
              src={demonShirt1}
              alt="Halloween Shirt"
              className="mt-2 w-20 md:w-24"
            />
          </div>

          {/* Card 4 */}
          <div className="relative  bg-black bg-opacity-70 p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img
              src={demonShirt2}
              alt="Halloween Shirt 2"
              className="mt-2 w-20 md:w-24"
            />
          </div>

          {/* Card 5 */}
          <div className="relative  bg-black bg-opacity-70 p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img
              src={demonShirt3}
              alt="Halloween Shirt"
              className="mt-2 w-20 md:w-24"
            />
          </div>

          {/* Card 6 */}
          <div className="relative  bg-black bg-opacity-70 p-10 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <img
              src={halloweenShirt}
              alt="Halloween Shirt 2"
              className="mt-2 w-20 md:w-24"
            />
          </div>
        </div>
        <Link to={"/collection"}>
          <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-5 rounded-full font-bold text-sm transition duration-300">
            Shop Now
          </button>
        </Link>
      </div>
    </>
  );
};

export default ClothesSection;
