import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../auth/auth";
import Spinner from "./Spinner";
import { FaSpinner } from "react-icons/fa";

import { facebookAuth } from "../config";
import axios from "axios";
import { logo } from "../assets";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const navigate = useNavigate();

  const responseFacebook = (response) => {
    setIsSocialLoading(true);
    const registerdata = {
      registerType: "facebook",
      name: response.name,
      email: response.email,
      userId: response.userID,
      accessToken: response.accessToken,
      profilePic: response.picture.data.url,
    };
    signup(registerdata)
      .then((res) => {
        setIsSocialLoading(false);
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSocialLoading(false);
      });
  };

  //   const googleLogin = useGoogleLogin({
  //     onSuccess: (tokenResponse) => {
  //       setGoogleData(tokenResponse);
  //       console.log(tokenResponse);
  //       if (googleData.access_token) {
  //         getProfile();
  //         console.log("entered");
  //       }
  //     },
  //     onError: (err) => console.log(err),
  //   });

  //   const getProfile = () => {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleData.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${googleData.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setGoogleProfileData(res.data);
  //         console.log(res.data);
  //         if (googleProfileData.data) {
  //           const registerData = {
  //             registerType: "google",
  //             name: googleProfileData.name,
  //             email: googleProfileData.email,
  //             userId: googleProfileData.id,
  //             accessToken: googleData.access_token,
  //             profilePic: googleProfileData.picture,
  //           };
  //           signup(registerData)
  //             .then((res) => {
  //               console.log(res);
  //               if (res.status === 200) {
  //                 navigate("/");
  //               }
  //             })
  //             .catch((err) => console.log(err));
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          //   setGoogleProfileData(res.data);
          setIsSocialLoading(true);
          const registerData = {
            registerType: "google",
            name: res.data.name,
            email: res.data.email,
            userId: res.data.id,
            accessToken: tokenResponse.access_token,
            profilePic: res.data.picture,
          };
          signup(registerData)
            .then((res) => {
              setIsSocialLoading(false);
              if (res.status === 200) {
                navigate("/");
              }
            })
            .catch((err) => {
              console.log(err);
              setIsSocialLoading(false);
            });
        })
        .catch((err) => {
          setIsSocialLoading(false);
          console.log(err);
        });
    },
    onError: (err) => {
      console.log(err);
      setIsSocialLoading(false);
    },
  });

  //   const getProfile = () => {};

  const emailRegister = () => {
    setIsLoading(true);
    const registerData = {
      registerType: "email",
      name: name,
      email: email,
      password: password,
    };
    signup(registerData)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const randomImage =
    "https://source.unsplash.com/1600x900/?nature,photography,travel";

  return (
    <section className='min-h-screen flex items-stretch text-white '>
      <div
        className='lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center'
        style={{
          backgroundImage: `url(${randomImage})`,
        }}
      >
        <div className='absolute bg-black opacity-60 inset-0 z-0'></div>
        <div className='w-full px-24 z-10'>
          <h1 className='text-5xl font-bold text-left tracking-wide'>
            Keep it special
          </h1>
          <p className='text-3xl my-4'>
            Capture your personal memory in unique way, anywhere.
          </p>
        </div>
        <div className='bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4'>
          {/*                social media icons  */}
        </div>
      </div>
      <div
        className='lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0'
        style={{ backgroundColor: "#161616" }}
      >
        <div
          className='absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center'
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80")`,
          }}
        >
          <div className='absolute bg-black opacity-60 inset-0 z-0'></div>
        </div>
        <div className='w-full py-6 z-20'>
          <h1 class='my-6'>
            <div class='flex justify-center items-center'>
              <img src={logo} alt='logo' class='w-40 h-auto' />
            </div>
          </h1>
          <div className='py-6 space-x-2'>
            <FacebookLogin
              appId={facebookAuth.clientId}
              fields='name,email,picture'
              callback={responseFacebook}
              render={(renderProps) => (
                <span
                  onClick={renderProps.onClick}
                  className='w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white cursor-pointer'
                >
                  <i
                    class='fa-brands fa-facebook-f'
                    style={{ color: "#ffffff" }}
                  ></i>
                </span>
              )}
            />
            <span
              className='w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white cursor-pointer'
              onClick={() => googleLogin()}
            >
              <i class='fa-brands fa-google' style={{ color: "#ffffff" }}></i>
            </span>
          </div>
          <p className='text-gray-100'>or use email your account</p>
          <form className='sm:w-2/3 w-full px-4 lg:px-0 mx-auto'>
            <div class='pb-2 pt-4'>
              <input
                className='block w-full p-4 text-lg rounded-sm bg-black'
                type='text'
                name='name'
                id='name'
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='pb-2 pt-4'>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                className='block w-full p-4 text-lg rounded-sm bg-black'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class='pb-2 pt-4'>
              <input
                className='block w-full p-4 text-lg rounded-sm bg-black'
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='text-right text-gray-400 hover:text-gray-100'>
              Already have an account?{" "}
              <a href='/login' class='hover:underline'>
                {" "}
                sign in
              </a>
            </div>
            <div className='px-4 pb-2 pt-4'>
              <button
                disabled={isLoading}
                type='button'
                className='uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none'
                onClick={emailRegister}
              >
                {isLoading ? <FaSpinner className='animate-spin' /> : "sign up"}
              </button>
            </div>
          </form>
        </div>
        {isSocialLoading ? (
          <span className='absolute inset-0 flex justify-center items-center'>
            <FaSpinner className='animate-spin' />{" "}
          </span>
        ) : null}
      </div>
    </section>
  );
};

export default Register;
