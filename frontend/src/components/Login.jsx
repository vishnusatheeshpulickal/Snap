import React, { useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { facebookAuth } from "../config";
import { logo } from "../assets";

const Login = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };

  console.log(facebookAuth.clientId);
  return (
    <section className='min-h-screen flex items-stretch text-white '>
      <div
        className='lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center'
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80")`,
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
                  f
                </span>
              )}
            />

            <span className='w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white'>
              G+
            </span>
            <span className='w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white'>
              in
            </span>
          </div>
          <p className='text-gray-100'>or use email your account</p>
          <form action='' className='sm:w-2/3 w-full px-4 lg:px-0 mx-auto'>
            <div className='pb-2 pt-4'>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                className='block w-full p-4 text-lg rounded-sm bg-black'
              />
            </div>
            <div class='pb-2 pt-4'>
              <input
                className='block w-full p-4 text-lg rounded-sm bg-black'
                type='password'
                name='password'
                id='password'
                placeholder='Password'
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
              <button className='uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none'>
                sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
