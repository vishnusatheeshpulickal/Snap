import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import axios from "axios";
import getDownloadUrl from "./getDownloadUrl";
import { getToken } from "../auth/auth";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const alreadySaved = currentUser ? currentUser.savedPins.includes(_id) : null;

  const userPin = currentUser?._id === postedBy?._id;

  const token = getToken();
  const config = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3100/api/v1/user/user", config)
      .then((res) => setCurrentUser(res.data.data))
      .catch((err) => console.log(err));
  }, [_id]);

  const savePin = (_id) => {
    if (!alreadySaved) {
      axios
        .post(
          "http://localhost:3100/api/v1/user/savepin",
          { pinId: _id },
          config
        )
        .then((res) => console.log("Pined Saved"))
        .catch((err) => console.log(err));
    }
  };

  const deletePin = (id) => {
    axios
      .post(
        "http://localhost:3100/api/v1/user/deletepin",
        { pinId: id },
        config
      )
      .then((res) => console.log("Pin deleted successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <div className='m-2'>
      <div
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        <img
          className='rounded-lg w-full'
          src={image}
          width='250'
          alt='user-post'
        />
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{ height: "100%" }}
          >
            <div className='flex item-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={`${image ? getDownloadUrl(image) : ""}`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {!userPin ? (
                <>
                  {alreadySaved ? (
                    <button
                      type='button'
                      className='bg-red-500 opacity-70 hover:opacity-100 text-white fond-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'
                    >
                      {save?.length}Saved
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        savePin(_id);
                      }}
                      className='bg-red-500 opacity-70 hover:opacity-100 text-white fond-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'
                    >
                      Save
                    </button>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a
                  href={destination}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-white flex items-center gap-2 text-black font-bond p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md'
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  <BsFillArrowUpRightCircleFill /> link
                </a>
              )}
              {postedBy?._id === currentUser?._id && (
                <button
                  type='button'
                  className='bg-white p-2 opacity-70 hover:opacity-100 fond-bold text-dark rounded-3xl hover:shadow-md outlined-none'
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        <Link
          to={`/user-profile/${postedBy?._id}`}
          className='flex gap-2 mt-2 items-center'
        >
          <img
            src={postedBy?.profilePic}
            className='w-8 h-8 rounded-full object-cover'
            alt='user-profile'
          />

          <p className='font-semibold capitalize'>{postedBy?.name}</p>
        </Link>
      </div>
    </div>
  );
};

export default Pin;
