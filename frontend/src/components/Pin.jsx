import React from "react";

const Pin = ({ pin: { postedBy, image, _id, destination } }) => {
  return (
    <div>
      <img
        className='rounded-lg w-full'
        src={image}
        width='250'
        alt='user-post'
      />
    </div>
  );
};

export default Pin;
