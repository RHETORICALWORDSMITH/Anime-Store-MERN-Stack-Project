import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import axios from "axios";
import { useSearchedAnime } from "../context/searchProvider.jsx";
import { motion } from "framer-motion";
import speaker from "../../public/speaker.png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Collection = () => {
  const [anime, setAnime] = useState([]);
  //search context
  const [search, setSearch] = useSearchedAnime();
  //state of checkboxes
  const [isChecked, setIsChecked] = useState(true);
  // Product Navigation
  const productTypes = ["Comics", "Action Figure", "Clothes", "Shoes"];
  // Collection heading
  const [colHead, setColHead] = useState("Comics");
  //state for filters
  const [filterName, setFilterName] = useState();
  //Filter Array
  const filterArray =
    colHead === "Comics"
      ? [
          "Fantasy",
          "Adventure",
          "Thriller",
          "Action",
          "High to Low",
          "Low to High",
        ]
      : ["High to Low", "Low to High"];

  const handleProductNavigation = async (currentProduct) => {
    try {
      setColHead(currentProduct);

      //Loads product Section
      const res = await axios.get(`http://localhost:3000/anime/`);

      const desiredCategory = res.data.filter((item) => {
        return item.category.includes(currentProduct);
      });

      setAnime(desiredCategory);
      //to make the check boxes unmarked
      setFilterName(null);
      setIsChecked(false);
    } catch (error) {
      console.log(error);
    }
  };
  //To search via filters
  const handleFilterChange = (appliedFilter, currState) => {
    setFilterName(appliedFilter);
    setIsChecked(currState);
    if (currState === false) {
      const recoverAnime = async () => {
        const res = await axios.get(`http://localhost:3000/anime/`);
        setAnime(res.data);
      };
      recoverAnime();
    }
  };

  useEffect(() => {
    // console.log("search in Array form having an:");
    // console.log(search);
    const getAnime = async () => {
      try {
        let searchName = "";
        if (
          Array.isArray(search) &&
          search.length > 0 &&
          search[0].hasOwnProperty("name")
        ) {
          searchName = search[0].name;
        }

        if (searchName) {
          const res = await axios.get(`http://localhost:3000/anime/`);
          const requiredAnime = res.data.filter((item) =>
            item.name.includes(searchName)
          );
          setAnime(requiredAnime);
          setColHead("Search Results");

          // console.log("the thing you searchde" + searchName);
        } else {
          const res = await axios.get(`http://localhost:3000/anime/`);
          const Comics = res.data.filter((item) => {
            return item.category.includes("Comics");
          });
          setAnime(Comics);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAnime();
  }, [search]);

  useEffect(() => {
    const getAnimeViaFil = async () => {
      try {
        if (filterName) {
          const res = await axios.get(`http://localhost:3000/anime/`);
          const requiredCategory = res.data.filter((item) => {
            return item.category.includes(colHead);
          });
          let requiredItems;
          if (colHead === "Comics") {
            requiredItems = requiredCategory.filter((item) => {
              return item.genre.includes(filterName);
            });
          }
          if (filterName === "High to Low") {
            // Sort the items by price in descending order
            requiredItems = requiredCategory.sort((a, b) => b.price - a.price);
          } else if (filterName === "Low to High") {
            requiredItems = requiredCategory.sort((a, b) => a.price - b.price);
          }

          setAnime(requiredItems);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAnimeViaFil();
  }, [filterName]);

  useEffect(() => {
    //to make the check boxes unmarked
    setFilterName(null);
    setIsChecked(false);
  }, [search]);

  //search functionality for the search bar in the collection
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // console.log(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/search/${searchTerm}`
      );
      const searchInfo = response.data;
      if (searchInfo.length > 0) {
        console.log(searchInfo); // Handle the response data as needed
        setSearch(searchInfo);
        if (window.location != "http://localhost:5173/collection") {
          navigate("/collection");
        }
      } else {
        toast.error("invalid Item check your input!");
      }
      // Programmatically navigate to /collection
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-4 mt-16 overflow-hidden">
      <div className="mt-28 flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-4xl">Product Categories</h1>
        {/* Product NAVIAGTION */}

        <div className="flex flex-col">
          <div className="relative flex justify-center items-center h-40 mb-96">
            <img
              src={speaker}
              className="w-96 mt-96 hidden lg:inline xl:inline"
            />
            <motion.div
              // Initial state
              initial={{ opacity: 0, scale: 0.5 }}
              // Animate state
              animate={{ opacity: 1, scale: 1 }}
              // Transition
              transition={{
                duration: 1.5, // Duration of the animation
                ease: "easeInOut", // Easing function
              }}
              className="flex items-center justify-center w-3/4 sm:w-2/3 md:w-2/3 lg:w-1/2 h-[700px]"
            >
              {" "}
              {/* TV Container */}
              <div className="relative w-screen h-3/4 bg-black rounded-lg shadow-lg overflow-hidden mt-96">
                {/* Screen */}
                <div className="absolute inset-1 bg-gray-800 bg-[url(../../public/tablet-bg2.jpg)] bg-no-repeat bg-cover bg-center">
                  <div className="absolute bg-black opacity-70 w-full h-screen"></div>
                  <div className="text-white text-lg">
                    {/* Interface */}
                    <div className="flex flex-col absolute inset-1.5 bg-cover bg-center">
                      <div className="relative bottom-0 flex flex-col items-center gap-[146px]">
                        <div className="flex flex-col items-center gap-4 mt-12">
                          <h1 className="text-2xl font-bold text-yellow-400 z-10">
                            {colHead}
                          </h1>
                          <div
                            className={` flex-col h-[146px] gap-3 items-end flex overflow-y-auto z-40`}
                          >
                            {filterArray.map((filter) => (
                              <div
                                key={filter}
                                className={`form-control px-7 flex`}
                              >
                                <label className="cursor-pointer flex items-center gap-10">
                                  <span className="label-text text-white font-bold text-lg">
                                    {filter}
                                  </span>
                                  <input
                                    checked={filterName === filter && isChecked}
                                    type="checkbox"
                                    className="checkbox checkbox-warning sm:w-6 z-20"
                                    onChange={(e) => {
                                      handleFilterChange(
                                        filter,
                                        e.target.checked
                                      );
                                    }}
                                  />
                                </label>
                              </div>
                            ))}
                          </div>

                          <label className="input border border-gray-400 rounded-md flex bg-white dark:bg-slate-900">
                            <form
                              className="flex items-center justify-between w-full"
                              onSubmit={handleSubmit}
                            >
                              <input
                                type="text"
                                value={searchTerm}
                                className="flex-grow outline-none text-black z-50 dark:text-white placeholder:text-black dark:placeholder:text-white"
                                placeholder="Search Item"
                                onChange={handleChange}
                              />
                              <button
                                type="submit"
                                className="flex-shrink-0 z-50"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                  className="h-6 opacity-70"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </form>
                          </label>
                        </div>
                        <div className="flex gap-3 px-5 w-screen bg-gray-900  justify-center items-center">
                          {productTypes.map((productType, index) => {
                            return (
                              <div key={index} className="relative group z-10">
                                <img
                                  src={`../../public/${productType
                                    .replace(/\s+/g, "")
                                    .toLowerCase()}.gif`}
                                  className="h-14 cursor-pointer"
                                  onClick={() => {
                                    handleProductNavigation(productType);
                                  }}
                                />
                                <span className="absolute top-0 font-semibold left-1/2 transform -translate-x-1/2 -translate-y-full bg-white text-black p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                  {productType}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Bezel */}
                <div className="absolute inset-0.5 border-4 border-red-500 rounded-lg"></div>
                {/* Stand */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-5 w-24 h-6 bg-gray-700 rounded-b-lg"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-32 h-1 bg-gray-900 rounded"></div>
              </div>
            </motion.div>
            <img
              src={speaker}
              className="w-96 mt-96 hidden lg:inline xl:inline"
            />
          </div>
        </div>

        <Link to="/">
          <button className="bg-pink-500 text-white px-4 py-2 rounded-md mt-6 hover:text-black hover:bg-pink-700 duration 300">
            Back
          </button>
        </Link>
      </div>
      <span className="text-5xl flex justify-center mt-28 dark:bg-black bg-gray-500 p-4 rounded-md shadow-lg shadow-black dark:shadow-gray-500">
        {colHead}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto max-h-[2500px]">
        {anime.map((item) => (
          <div
            key={item.id}
            className="max-w-sm mx-auto rounded shadow-md overflow-hidden"
          >
            <Cards key={item.id} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
