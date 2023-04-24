import React, { useState, useEffect } from "react";
import axios from "axios";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { getToken } from "../auth/auth";

const token = getToken();
const config = {
  headers: { Authorization: token },
};

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);

      axios
        .post(
          `http://localhost:3100/api/v1/user/search`,
          { searchTerm },
          config
        )
        .then((res) => {
          setPins(res.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`http://localhost:3100/api/v1/user/viewpins`, config)
        .then((res) => setPins(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message='Searching for pins...' />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className='mt-10 text-center text-xl'>No pins found!</div>
      )}
    </div>
  );
};

export default Search;
