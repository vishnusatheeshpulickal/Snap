import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { getToken, signout } from "../auth/auth";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [savedPins, setSavedPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");

  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const { userId } = useParams();

  const token = getToken();
  const config = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3100/api/v1/user/user", config)
      .then((res) => {
        setCurrentUser(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/v1/user/viewuser/${userId}`, config)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      setLoading(true);
      axios
        .get(`http://localhost:3100/api/v1/user/createdpins/${userId}`, config)
        .then((res) => {
          setPins(res.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(true);
      axios
        .get(`http://localhost:3100/api/v1/user/savedpins/${userId}`, config)
        .then((res) => {
          setSavedPins(res.data.data.savedPins);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message='Loading profile...' />;
  }

  const signOut = () => {
    signout();
    window.location.reload(false);
  };

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5 '>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={randomImage}
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              alt='banner'
            />
            <img
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              src={user.profilePic}
              alt='user'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>{user.name}</h1>
            <div className='absolute top-0 z-1 right-0 p-2'>
              {userId === currentUser?._id && (
                <div className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'>
                  <AiOutlineLogout
                    color='red'
                    fontSize={21}
                    onClick={signOut}
                  />
                </div>
              )}
            </div>
          </div>
          <div className='text-center mb-7'>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
          </div>
          {loading ? (
            <Spinner message='Loading pin...' />
          ) : activeBtn === "created" ? (
            pins?.length ? (
              <div className='px-2'>
                <MasonryLayout pins={pins} />
              </div>
            ) : (
              <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
                No pins found!
              </div>
            )
          ) : loading ? (
            <Spinner message='Loading pin...' />
          ) : savedPins?.length ? (
            <div className='px-2'>
              <MasonryLayout pins={savedPins} />
            </div>
          ) : (
            <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
              No pins found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
