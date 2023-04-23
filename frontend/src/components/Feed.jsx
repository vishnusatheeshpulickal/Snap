import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { getToken } from "../auth/auth";

const Feeds = () => {
  const [loading, setLoading] = useState(false);
  // const [pins, setPins] = useState(null);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  const token = getToken();
  const config = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      setLoading(true);
      axios
        .get(`http://localhost:3100/api/v1/user/viewpins/${categoryId}`, config)
        .then((res) => {
          setPins(res.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(true);
      axios
        .get("http://localhost:3100/api/v1/user/viewpins", config)
        .then((res) => {
          setPins(res.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message='we are adding new ideas to your feed!' />;
  return (
    <div>
      {pins?.length ? (
        <MasonryLayout pins={pins} />
      ) : (
        <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
          No pins found!
        </div>
      )}
    </div>
  );
};

export default Feeds;
