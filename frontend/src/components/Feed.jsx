import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const data = [
  {
    title: "Sample 1",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/5496463/pexels-photo-5496463.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sample 2",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/9553909/pexels-photo-9553909.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sample 3",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/7988087/pexels-photo-7988087.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sample 4",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/7172094/pexels-photo-7172094.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sample 5",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/9553909/pexels-photo-9553909.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sample 6",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/5473952/pexels-photo-5473952.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sample 7",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sample 8",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/5496463/pexels-photo-5496463.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sample 9",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Sample 10",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/9553909/pexels-photo-9553909.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const Feeds = () => {
  const [loading, setLoading] = useState(false);
  // const [pins, setPins] = useState(null);
  const [pins, setPins] = useState(data);
  const { categoryId } = useParams();

  // useEffect(() => {
  //   setLoading(true);
  //   if (categoryId) {
  //   } else {

  //   }
  // }, [categoryId])

  if (loading)
    return <Spinner message='we are adding new ideas to your feed!' />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feeds;
