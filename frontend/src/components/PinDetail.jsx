import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import getDownloadUrl from "./getDownloadUrl";
import { getToken } from "../auth/auth";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const fetchPinDetails = () => {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    axios
      .get(`http://localhost:3100/api/v1/user/pindetails/${pinId}`, config)
      .then((res) => {
        setPinDetail(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetail) return <Spinner message='Loading pin...' />;

  return (
    <div
      className='flex xl-flex-row flex-col m-auto bg-white'
      stylle={{ maxWidth: "1500px", borderWidth: "320px" }}
    >
      <div className='flex justify-center items-center md:items-start flex-initial'>
        <img
          src={pinDetail?.image}
          alt='user-post'
          className='rounded-t-3xl rounded-b-lg '
        />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex items-center justify-between '>
          <div className='flex gap-2 items-center'>
            <a
              href={`${getDownloadUrl(pinDetail.image)}`}
              download
              onClick={(e) => e.stopPropagation()}
              className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetail.destination} target='_blank' rel='noreferrer'>
            {pinDetail.destination}
          </a>
        </div>
        <div>
          <h1 className='text-4xl font-bold break-words mt-3'>
            {pinDetail.title}
          </h1>
          <p className='mt-3'>{pinDetail.about}</p>
        </div>
        <Link
          to={`/user-profile/${pinDetail.postedBy?._id}`}
          className='flex gap-2 mt-2 items-center'
        >
          <img
            src={pinDetail.postedBy?.profilePic}
            className='w-8 h-8 rounded-full object-cover'
            alt='user-profile'
          />

          <p className='font-semibold capitalize'>{pinDetail.postedBy?.name}</p>
        </Link>
      </div>
    </div>
  );
};

export default PinDetail;
