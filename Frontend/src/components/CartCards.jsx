import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  updateDecrement,
  updateIncrement,
} from "../redux/counter/cartSlice.js";

const CartCards = () => {
  // Using Redux
  const boughtItems = useSelector((state) => state.cartItems.purchasedItems);
  console.log("boughtItems: ");
  console.log(boughtItems);

  //email to add in boughtitem
  const currEmail = useSelector((state) => state.email.currEmail);

  // Calculate total bill
  const totalBill = boughtItems.reduce(
    (total, item) => total + item.price * item.noItem,
    0
  );

  const dispatch = useDispatch();

  const emptyCart = () => {
    setTimeout(() => {
      boughtItems.map((boughtItem) => {
        dispatch(
          updateDecrement({
            noItem: boughtItem.noItem,
            item: boughtItem,
            itemSize: boughtItem.itemSize,
          })
        );
      });
    }, 1000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(currEmail);

    const location = data.location;
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedDate = yyyy + "-" + mm + "-" + dd; // Output: 2024-07-21 (assuming today is July 21, 2024)
    console.log("CCFYUJNBVGCFFTYUIOKMNBVCGFTYIOKMNBG: ");

    console.log(boughtItems);
    //boughtItems are unextensgible so create a shallow copy of it so that the code can work
    const dataToSend = boughtItems.map((item) => ({
      ...item,
      location: location,
      email: currEmail,
      date: formattedDate,
    }));
    // this id is generated by mongodb to distinguish between the similar datas so if multiple users purchased item have
    // the same -id then it would be problematic so delete it here and then after the data is saved in data base
    //mongodb will create a unique id fro every item again
    dataToSend.forEach((obj) => delete obj._id);
    console.log("view this:");
    console.log(dataToSend);
    // sending post rquest to send data to the backend
    try {
      const res = await axios.post(
        "https://anime-store-backend.vercel.app/history/",
        dataToSend
      );
      console.log(res.data);
    } catch (error) {
      console.log("error while sending purchase history");
      console.log(error);
    }
    toast.success("Order Complete! Your purchase will be delivered soon!");
  };

  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row shadow-lg dark:bg-gray-800 lg:h-[900px] bg-gray-300">
          <div className="w-full lg:w-3/4 p-8">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            <div className="border-b dark:border-white border-black mb-4 pb-4 flex justify-between">
              <span className="text-lg">Items: {boughtItems.length}</span>
              <Link to={"/collection"}>
                <span href="#" className="text-purple-600">
                  Continue Shopping
                </span>
              </Link>
            </div>
            <div className="lg:h-3/4 xl:h-3/4 h-[500px] overflow-auto">
              {boughtItems.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 flex items-center justify-between border-b dark:border-white border-black pb-4"
                >
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32  object-contain"
                    />
                    {item.category !== "Action Figures" && (
                      <h3 className="text-lg font-bold bg-pink-500">
                        {item.category === "Clothes" ||
                        item.category === "Shoes"
                          ? `Size: ${item.itemSize}` // Use template literal without curly braces
                          : `Genere: ${item.genre}`}
                      </h3>
                    )}
                  </div>
                  <div className="flex justify-center gap-1 flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row sm:items-center">
                    <div className="flex border dark:border-gray-300 border-black">
                      <button
                        className="px-2 py-1 dark:text-gray-600 text-black text-xl"
                        onClick={() =>
                          dispatch(
                            updateDecrement({
                              noItem: 1,
                              itemSize: item.itemSize,
                              item,
                            })
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-12 text-center text-white"
                        value={item.noItem}
                        readOnly
                      />
                      <button
                        className="px-2 py-1 dark:text-gray-600 text-xl"
                        onClick={() =>
                          dispatch(
                            updateIncrement({
                              noItem: 1,

                              itemSize: item.itemSize,
                              item,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-bold ml-6">
                      {(item.price * item.noItem).toFixed(2)}$
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/4 dark:bg-gray-600 bg-gray-500 p-8">
            <div>
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="flex justify-between mb-4">
                <span>Items {boughtItems.length}</span>
                <span>{totalBill.toFixed(2)}$</span>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="shipping"
                  className="block text-sm font-medium mb-2"
                >
                  Shipping
                </label>
                <select
                  id="shipping"
                  className="w-full p-2 border border-gray-300"
                >
                  <option>Standard Delivery - 5$</option>
                </select>
              </div>

              <div className="flex justify-between mb-6 font-bold">
                <span>Total Cost</span>
                <span>{(totalBill + 5).toFixed(2)}$</span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="input input-bordered flex items-center gap-2  dark:bg-slate-900 bg-white border-black dark:border-white">
                  <input
                    type="text"
                    {...register("location", {
                      required: true,
                      errors: "This field is required",
                    })}
                    className="grow text-black placeholder:text-black dark:placeholder:text-white dark:text-white"
                    placeholder="Location Address!"
                  />
                </label>
                <div className="flex flex-col ">
                  {errors.location && (
                    <span className="text-red-500 z-10 mt-5">
                      Location address is required!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="bg-red-600 text-white py-3 px-4 w-full text-lg mt-5"
                    onClick={emptyCart}
                  >
                    CHECKOUT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCards;
