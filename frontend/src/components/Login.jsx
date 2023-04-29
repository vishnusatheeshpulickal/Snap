import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { facebookAuth } from "../config";
import { logo } from "../assets";
import { signin, socialSignin } from "../auth/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { bg2 } from "../assets";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [incorrect, setIncorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const responseFacebook = (response) => {
    const type = "facebook";
    socialSignin(type, response.userID, response.accessToken).then((res) => {
      if (res.valid === true && res.status === 200) {
        setIncorrect(false);
        navigate("/");
      }
      if (res.valid === false && res.status === 400) {
        setIncorrect(true);
      }
    });
  };

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
          const type = "google";
          socialSignin(type, res.data.id, tokenResponse.access_token).then(
            (res) => {
              if (res.valid === true && res.status === 200) {
                setIncorrect(false);
                navigate("/");
              }
              if (res.valid === false && res.status === 400) {
                setIncorrect(true);
              }
            }
          );
        })
        .catch((err) => {
          console.log(err);
          setIncorrect(true);
        });
    },
    onError: (err) => {
      console.log(err);
      setIncorrect(true);
    },
  });

  const emailLogin = () => {
    setIsLoading(true);
    signin(email, password).then((res) => {
      if (res.valid === true && res.status === 200) {
        setIncorrect(false);
        setIsLoading(false);
        navigate("/");
      }
      if (res.valid === false && res.status === 400) {
        setIncorrect(true);
        setIsLoading(false);
      }
    });
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
            Focus on Life
          </h1>
          <p className='text-3xl my-4'>See the world through your own lens.</p>
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

          {incorrect ? (
            <div
              class='flex p-4 mb-4 text-sm text-red-800 text-center justify-center rounded-lg bg-red-40 dark:text-red-400'
              role='alert'
            >
              <svg
                aria-hidden='true'
                class='flex-shrink-0 inline w-5 h-5 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clip-rule='evenodd'
                ></path>
              </svg>
              <span class='sr-only'>Info</span>
              <div>
                <span class='font-medium'></span> Incorrect username or password
              </div>
            </div>
          ) : null}

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
              Don't have an account?{" "}
              <a href='/register' class='hover:underline'>
                {" "}
                sign up
              </a>
            </div>
            <div className='px-4 pb-2 pt-4'>
              <button
                className='uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none'
                onClick={() => emailLogin()}
                type='button'
                disabled={isLoading}
              >
                {isLoading ? <FaSpinner className='animate-spin' /> : "sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
