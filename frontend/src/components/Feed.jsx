import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const data = [
  {
    _id: "123445",
    title: "Sample 1",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/5496463/pexels-photo-5496463.jpeg?auto=compress&cs=tinysrgb&w=600",
    destination: "image url",
    postedBy: {
      _id: "user127",
      userName: "Maria",
      imageUrl:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29uYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  },
  {
    _id: "123455",
    title: "Sample 2",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/9553909/pexels-photo-9553909.jpeg?auto=compress&cs=tinysrgb&w=600",
    postedBy: {
      userName: "vishnu",
      _id: "user123",
      imageUrl: "https://avatars.githubusercontent.com/u/70451086?v=4",
    },
  },
  {
    _id: "133445",
    title: "Sample 3",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/7988087/pexels-photo-7988087.jpeg?auto=compress&cs=tinysrgb&w=600",
    postedBy: {
      _id: "user125",
      userName: "John",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29uYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  },
  {
    _id: "123445",
    title: "Sample 4",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/7172094/pexels-photo-7172094.jpeg?auto=compress&cs=tinysrgb&w=600",
    postedBy: {
      _id: "user123",
      userName: "vishnu",
      imageUrl: "https://avatars.githubusercontent.com/u/70451086?v=4",
    },
  },
  {
    _id: "183445",
    title: "Sample 5",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/9553909/pexels-photo-9553909.jpeg?auto=compress&cs=tinysrgb&w=600",
    postedBy: {
      _id: "user125",
      userName: "John",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29uYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  },
  {
    _id: "823445",
    title: "Sample 6",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/5473952/pexels-photo-5473952.jpeg?auto=compress&cs=tinysrgb&w=600",
    postedBy: {
      _id: "user127",
      userName: "Maria",
      imageUrl:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29uYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  },
  {
    _id: "623445",
    title: "Sample 7",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600",
    postedBy: {
      _id: "user127",
      userName: "Maria",
      imageUrl:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29uYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  },
  {
    _id: "323445",
    title: "Sample 8",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/5496463/pexels-photo-5496463.jpeg?auto=compress&cs=tinysrgb&w=600",
    postedBy: {
      _id: "user125",
      userName: "John",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29uYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  },
  {
    _id: "723445",
    title: "Sample 9",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600",
    postedBy: {
      _id: "user127",
      userName: "Maria",
      imageUrl:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29uYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  },
  {
    _id: "553445",
    title: "Sample 10",
    about: "sample about",
    category: "coding",
    image:
      "https://images.pexels.com/photos/9553909/pexels-photo-9553909.jpeg?auto=compress&cs=tinysrgb&w=600",
    postedBy: {
      _id: "user127",
      userName: "Maria",
      imageUrl:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29uYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
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
  axios
    .get("")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  //   }
  // }, [categoryId])

  if (loading)
    return <Spinner message='we are adding new ideas to your feed!' />;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feeds;
