import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useDispatch } from "react-redux";
import { emailTransfer } from "../redux/counter/transferEmailSlice.js";

const Login = () => {
  //redux
  const dispatch = useDispatch();

  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(emailTransfer({ email: data.email })); // transfer email to redux store
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "https://anime-store-backend.vercel.app/user/login",
        userInfo
      );
      const resData = res.data;
      console.log(res.data);
      setAuthUser(resData);
      if (res.data) {
        toast.success("Login successful!");
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      }
      document.getElementById("my_modal_2").showModal();
    } catch (err) {
      console.log(err);
      toast.error("Login failed!");
    }
  };
  return (
    <div>
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn bg-black text-white px-6 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          Login
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box bg-white dark:bg-black dark:text-white p-7 rounded-md">
            <form method="dialog">
              <button
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-3"
              >
                X
              </button>
            </form>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="font-bold text-lg">Login</h3>
              {/* Email */}
              <div className="mt-5 space-y-2">
                <span>Email</span>
                <br />
                <div className="flex gap-3">
                  <input
                    type="email"
                    className="p-2 rounded-md w-full my-2 bg-white dark:bg-gray-800 text-black dark:text-white outline-none dark:placeholder:text-white placeholder:text-black  dark:border-white border-black border"
                    placeholder="Enter your Email"
                    {...register("email", {
                      required: true,
                      errors: "This field is required",
                    })}
                  />
                  {errors.email && (
                    <span className="text-pink-500">
                      This field is required
                    </span>
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
                    className="p-2 rounded-md w-full my-2 bg-white dark:bg-gray-800 text-black dark:text-white outline-none dark:placeholder:text-white placeholder:text-black  dark:border-white border-black border"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: true,
                      errors: "This field is required",
                    })}
                  />
                  {errors.password && (
                    <span className="text-pink-500">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-around mt-6 items-center">
                <button
                  type="submit"
                  className="bg-pink-500 py-2 px-3 rounded-md text-black"
                >
                  Login
                </button>
                <p>
                  Not registered?{" "}
                  <span className="text-blue-500 underline cursor-pointer">
                    <Link to="/Signup">Signup</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Login;
