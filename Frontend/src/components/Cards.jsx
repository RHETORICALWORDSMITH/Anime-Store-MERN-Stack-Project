import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeVisibility } from "../redux/counter/buyComVisSlice";
import Buy from "./Buy.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const Cards = ({ item }) => {
  //using redux
  const detailVis = useSelector((state) => state.detailVis.value); // Accessing the state
  //for navigstion
  const navigate = useNavigate();

  // For dispatching actions
  const dispatch = useDispatch();

  const handleVisibility = () => {
    console.log("handle: " + detailVis);
    // Pass an object with iconst location = useLocation();

    if (location.pathname !== "/collection") {
      navigate("/collection");

      //item as a property this will toggle the visibility of the buy.jsx component
      setTimeout(() => {
        dispatch(changeVisibility({ item }));
      }, 500);
    } else {
      dispatch(changeVisibility({ item }));
    }
  };

  return (
    <>
      <div className="p-3 my-5">
        <div className="card shadow-md shadow-black dark:shadow-gray-500 dark:shadow-md w-hover:scale-105 duration-200 cursor-pointer bg-white text-black dark:bg-gray-800 dark:text-white rounded-md">
          <figure>
            <img
              className="w-screen h-80"
              src={`${item.image}`}
              alt="movie img"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title h-9">
              {item.name}
              <div className="badge badge-secondary">
                {item.genre ? item.genre : item.category}
              </div>
            </h2>
            <div className="flex flex-col gap-3 mt-4">
              {/* <p className="min-h-20">{item.title}</p> */}
              <div className="flex flex-col ">
                <div className="card-actions flex justify-between selectedItems-center">
                  <div className="px-3 py-1 border rounded-full">{`${item.price}$`}</div>
                  <div
                    className="cursor-pointer px-2 py-1 border rounded-full hover:bg-pink-500 hover:border-none hover:text-black hover:font-bold"
                    onClick={handleVisibility}
                  >
                    Order!
                  </div>
                </div>
                <div className={`${detailVis ? "inline" : "hidden"}`}>
                  <Buy />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
