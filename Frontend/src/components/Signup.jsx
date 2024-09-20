import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { emailTransfer } from "../redux/counter/transferEmailSlice.js";

const Signup = () => {
  //to set the theme
  const theme = localStorage.getItem("theme");
  console.log("from sign up form: " + theme);

  //redux
  const dispatch = useDispatch();

  const location = useLocation();
  const to = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    toast.success("Verifying your email address!");
    //this is email Validation api key It  is for verification if email exists only then it will be dispatched
    let key = "ema_live_zaab08z8UzLPghvDdlXN71UubJXAfHWnxQJ6pn6I";
    let email = data.email;
    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
    let res = await fetch(url); // axios can not used in here
    let apiData = await res.json(); // return an object in which form-valid tells if the email exists or not.
    // console.log(apiData);
    
    if (apiData.format_valid === true) {
      dispatch(emailTransfer({ email: data.email })); // transfer email to redux store

      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      try {
        const res = await axios.post(
          "https://anime-store-backend.vercel.app/user/signup",
          userInfo
        );
        const resData = res.data;
        console.log(res.data);
        if (res.data) {
          toast.success("Signup successful!");
          localStorage.setItem("userInfo", JSON.stringify(res.data));
        }
        setTimeout(() => {
          window.location.replace(`http://localhost:5173${to}`); // to go back to the main page
          //  navigate(from, {replace: true}); // import navigate hook to use this
        }, 1000);
      } catch (err) {
        console.log(err);
        toast.error("Signup failed user already exists!");
      }
    } else {
      toast.error("Email is not valid!");
    }
  };
  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } items-center justify-center shadow-md`}
    >
      <div className="w-[600px]">
        <div
          className={`modal-box ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } p-7 rounded-md`}
        >
          <form method="dialog">
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-3"
            >
              X
            </Link>
          </form>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg">Signup</h3>
            {/* Name */}
            <div className="mt-5 space-y-2">
              <span>Name</span>
              <br />
              <div className="flex gap-3">
                <input
                  type="text"
                  className={`p-2 rounded-md w-full my-2 ${
                    theme === "dark"
                      ? " text-white outline-none placeholder:text-white  border-white bg-gray-800"
                      : "bg-white text-black  placeholder:text-black  border-black border"
                  }`}
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: true,
                    errors: "This field is required",
                  })}
                />
                {errors.name && (
                  <span className="text-pink-500">This field is required</span>
                )}
              </div>
            </div>
            {/* Email */}
            <div className="mt-5 space-y-2">
              <span>Email</span>
              <br />
              <div className="flex gap-3">
                <input
                  type="email"
                  className={`p-2 rounded-md w-full my-2  ${
                    theme === "dark"
                      ? " text-white outline-none placeholder:text-white  border-white bg-gray-800"
                      : "bg-white text-black  placeholder:text-black  border-black border"
                  }`}
                  placeholder="Enter your Email"
                  {...register("email", {
                    required: true,
                    errors: "This field is required",
                  })}
                />
                {errors.email && (
                  <span className="text-pink-500">This field is required</span>
                )}
              </div>
            </div>
            {/* password */}
            <div className="mt-5 space-y-2">
              <span>Password</span>
              <br />
              <div className="flex gap-3">
                <input
                  type="password"
                  className={`p-2 rounded-md w-full my-2 ${
                    theme === "dark"
                      ? " text-white outline-none placeholder:text-white  border-white bg-gray-800"
                      : "bg-white text-black  placeholder:text-black  border-black border"
                  }`}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: true,
                    errors: "This field is required",
                  })}
                />
                {errors.password && (
                  <span className="text-pink-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="flex justify-around mt-6 items-center">
              <button className="bg-pink-500 py-2 px-3 rounded-md text-black">
                Signup
              </button>
              <p>
                Have account?{" "}
                <span className="text-blue-500 underline cursor-pointer">
                  <Link
                    to="/"
                    onClick={() =>
                      setTimeout(() => {
                        document.getElementById("my_modal_2").showModal(); // Show the modal after navigation
                      }, 100)
                    }
                  >
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
